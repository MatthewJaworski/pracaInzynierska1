import { CreateTemplateDto } from '@app/common/dtos/create-template.dto';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'libs/common/entities/Document';
import { TemplatesDocuments } from 'libs/common/entities/TemplatesDocuments';
import { EntityManager, Repository } from 'typeorm';
import { S3Service } from './aws/S3.service';
import { UploadPDFTemplateDTO } from '@app/common/dtos/upload-pdf-template.dto';
import { UpdateTemplateDto } from '@app/common/dtos/update-template.dto';
import { PdfService } from './pdf/pdf.service';
import { TemplateField } from 'libs/common/entities/TemplateField';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { DocumentFieldValue } from 'libs/common/entities/DocumentFieldValue';
import { PredefinedFields } from 'libs/common/entities/PredefinedFields';
import { UserDto } from '@app/common/dtos/user.dto';
import { DocumentSortField } from '@app/common/types/document-sort-field';
import { DocumentSortParams } from '@app/common/dtos/document-sorting-params';
import { UpdateDocumentDto } from '@app/common/dtos/update-document.dto';
import { PdfFieldData } from '@app/common/dtos/pdf-field-data.dto';
import { CreatePredefinedField } from '@app/common/dtos/create-predfefined-fields.dto';
import { Attachment } from 'libs/common/entities/Attachment';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { CommonService } from '@app/common';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants/services';
import { CreateNotificationDto } from '@app/common/dtos/create-notification.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly pdfService: PdfService,
    private readonly commonService: CommonService,
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
    @Inject() private readonly rabbitService: RabbitService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationServiceClient: ClientProxy,
  ) {}

  async savePDFTemplate(
    file: UploadPDFTemplateDTO,
    context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const fileBuffer = Buffer.from(file.fileData, 'base64');

      await this.s3Service.uploadFile(
        fileBuffer,
        file.filename,
        file.mimetype,
        'pdfdocuments',
      );
      channel.ack(originalMsg);
    } catch {
      channel.nack(originalMsg, false, false);
      throw new Error('Error saving pdf template');
    }
  }

  async addAttachmentToDocument(
    documentId: string,
    files: Express.Multer.File[],
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      const document = await manager.findOne(Document, {
        where: { id: documentId },
        relations: ['attachments'],
      });

      if (!document) {
        throw new BadRequestException('Document not found');
      }

      const attachmentsToSave = [];

      for (const file of files) {
        const fileBuffer = Buffer.from(file.buffer);

        await this.s3Service.uploadFile(
          fileBuffer,
          file.originalname,
          file.mimetype,
          'attachments',
        );

        const attachment = manager.create(Attachment, {
          document: document,
          fileName: file.originalname,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        });

        attachmentsToSave.push(attachment);
      }
      await manager.save(attachmentsToSave);

      return { success: true };
    }, context);
  }

  async createTemplate(
    template: CreateTemplateDto & { file: Express.Multer.File },
    context: RmqContext,
  ) {
    const fileBuffer = Buffer.from(template.file.buffer);
    const fieldsForTemplate = await this.pdfService.getAllFields(fileBuffer);

    return await this.handleTransaction(async (manager) => {
      const predefinedFields = await manager.find(PredefinedFields);

      const templateData = {
        name: template.name,
        description: template.description,
        visibleForStudents: template.visibleForStudents,
        templateFileName: template.file.originalname,
      };
      const templateEntity = manager.create(TemplatesDocuments, templateData);

      const templateFields = fieldsForTemplate.map((field) => {
        return manager.create(TemplateField, {
          fieldName: field.name,
          dataType: field.type,
          isOptional: field.isOptional,
          isUserData: field.isUserData,
          isPredefined: predefinedFields.some(
            (predefinedField) => predefinedField.fieldName === field.name,
          ),
          isForDeanToFill: field.isForDeanToFill,
          options: field.options,
        });
      });
      templateEntity.templateFields = templateFields;

      await this.s3Service.uploadFile(
        fileBuffer,
        template.file.originalname,
        template.file.mimetype,
        'pdfdocuments',
      );
      await manager.save(TemplateField, templateFields);
      await manager.save(TemplatesDocuments, templateEntity);
      return HttpStatus.CREATED;
    }, context);
  }

  async getTemplates(context: RmqContext): Promise<{
    success: boolean;
    data: TemplatesDocuments[];
  }> {
    return this.handleTransaction(async (manager) => {
      const templates = await manager.find(TemplatesDocuments);
      return { success: true, data: templates };
    }, context);
  }

  async getTemplateFields(
    {
      templateId,
      userType,
    }: {
      templateId: string;
      userType: 'student' | 'dean';
    },
    context: RmqContext,
  ): Promise<{ success: boolean; data: TemplateField[] }> {
    return this.handleTransaction(async (manager) => {
      const templateFields = await manager.find(TemplateField, {
        where: { template: { id: templateId } },
      });
      let filteredFields: TemplateField[] = [];

      if (userType === 'student') {
        filteredFields = templateFields.filter((field) =>
          this.getIsForStudentToFill(field),
        );
      } else if (userType === 'dean') {
        filteredFields = templateFields.filter(
          (field) => field.isForDeanToFill,
        );
      } else {
        filteredFields = templateFields;
      }

      filteredFields = filteredFields.filter(
        (field) => field.fieldName !== 'currentData',
      );

      return { success: true, data: filteredFields };
    }, context);
  }

  async getFields(
    {
      page,
      pageSize,
    }: {
      page: number;
      pageSize: number;
    },
    context: RmqContext,
  ): Promise<{ fields: PredefinedFields[]; total: number }> {
    return this.handleTransaction(async (manager) => {
      const fields = await manager.find(PredefinedFields, {
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      const total = await manager.count(PredefinedFields);

      return { fields, total };
    }, context);
  }

  async getTemplate(
    id: string,
    context: RmqContext,
  ): Promise<{ success: boolean; data: TemplatesDocuments }> {
    return this.handleTransaction(async (manager) => {
      const template = await manager.findOne(TemplatesDocuments, {
        where: { id: id },
      });
      return { success: true, data: template };
    }, context);
  }

  async getTemplatesForStudent(context: RmqContext): Promise<{
    success: boolean;
    data: TemplatesDocuments[];
  }> {
    return this.handleTransaction(async (manager) => {
      const templates = await manager.find(TemplatesDocuments, {
        where: { visibleForStudents: true },
      });
      return { success: true, data: templates };
    }, context);
  }

  async getTemplatePDFs(
    context: RmqContext,
  ): Promise<{ success: boolean; data: string[] }> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const filesNames = await this.s3Service.getFileNames('pdfdocuments');
      channel.ack(originalMsg);
      return { success: true, data: filesNames };
    } catch {
      channel.nack(originalMsg, false, false);
      throw new Error('Error getting pdf files');
    }
  }

  async updateTemplate(
    updateTemplateData: UpdateTemplateDto & { file?: Express.Multer.File },
    context: RmqContext,
  ): Promise<{ success: boolean }> {
    const { file, ...updateData } = updateTemplateData;

    return this.handleTransaction(async (manager) => {
      const template = await manager.findOne(TemplatesDocuments, {
        where: { id: updateTemplateData.id },
        relations: ['templateFields'],
      });

      if (!template) {
        throw new Error('Template not found');
      }

      if (file && updateData.newTemplate) {
        const fileBuffer = Buffer.from(file.buffer);

        await this.s3Service.uploadFile(
          fileBuffer,
          file.originalname,
          file.mimetype,
          'pdfdocuments',
        );

        const fieldsForTemplate =
          await this.pdfService.getAllFields(fileBuffer);

        const existingFieldsMap = new Map<string, TemplateField>();
        for (const field of template.templateFields) {
          existingFieldsMap.set(field.fieldName, field);
        }

        const newFieldsMap = new Map<string, PdfFieldData>();
        for (const field of fieldsForTemplate) {
          newFieldsMap.set(field.name, field);
        }

        const fieldsToAdd: TemplateField[] = [];
        const fieldsToUpdate: TemplateField[] = [];
        const fieldsToRemove: TemplateField[] = [];

        for (const [fieldName, fieldData] of newFieldsMap.entries()) {
          if (existingFieldsMap.has(fieldName)) {
            const existingField = existingFieldsMap.get(fieldName);
            let needsUpdate = false;

            if (
              existingField.dataType !== fieldData.type ||
              existingField.isOptional !== fieldData.isOptional ||
              existingField.isUserData !== fieldData.isUserData ||
              existingField.isPredefined !== fieldData.isPredefined ||
              existingField.isForDeanToFill !== fieldData.isForDeanToFill ||
              JSON.stringify(existingField.options) !==
                JSON.stringify(fieldData.options)
            ) {
              needsUpdate = true;
            }

            if (needsUpdate) {
              Object.assign(existingField, {
                dataType: fieldData.type,
                isOptional: fieldData.isOptional,
                isUserData: fieldData.isUserData,
                isPredefined: fieldData.isPredefined,
                isForDeanToFill: fieldData.isForDeanToFill,
                options: fieldData.options,
              });
              fieldsToUpdate.push(existingField);
            }

            existingFieldsMap.delete(fieldName);
          } else {
            const newField = manager.create(TemplateField, {
              fieldName: fieldData.name,
              dataType: fieldData.type,
              isOptional: fieldData.isOptional,
              isUserData: fieldData.isUserData,
              isPredefined: fieldData.isPredefined,
              isForDeanToFill: fieldData.isForDeanToFill,
              options: fieldData.options,
            });
            fieldsToAdd.push(newField);
          }
        }

        fieldsToRemove.push(...existingFieldsMap.values());

        if (fieldsToAdd.length > 0) {
          await manager.save(TemplateField, fieldsToAdd);
          template.templateFields.push(...fieldsToAdd);
        }

        if (fieldsToUpdate.length > 0) {
          await manager.save(TemplateField, fieldsToUpdate);
        }

        if (fieldsToRemove.length > 0) {
          const fieldIdsToRemove = fieldsToRemove.map((field) => field.id);
          await manager.delete(TemplateField, fieldIdsToRemove);
        }
      }
      Object.assign(template, updateData);
      if (updateData.newTemplate) template.templateFileName = file.originalname;

      await manager.save(TemplatesDocuments, template);

      return { success: true };
    }, context);
  }

  async updatePredefinedField(
    data: CreatePredefinedField,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      const predefinedField = await manager.findOne(PredefinedFields, {
        where: { id: data.fieldId },
      });

      if (!predefinedField) {
        throw new BadRequestException('Predefined field not found');
      }

      predefinedField.value = data.value;
      predefinedField.fieldName = data.fieldName;

      await manager.save(PredefinedFields, predefinedField);
    }, context);
  }

  async deleteTemplate(id: string, context: RmqContext) {
    this.handleTransaction(async (manager) => {
      const template = await manager.findOne(TemplatesDocuments, {
        where: { id },
      });

      if (template) {
        await manager.remove(template);
      }
    }, context);
  }

  async updateDocumentFields(
    request: FillTemplateDto,
    documentId: string,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      const document = await manager.findOne(Document, {
        where: { id: documentId },
        relations: ['fieldValues', 'fieldValues.templateField'],
      });

      if (!document) {
        throw new BadRequestException('Document not found');
      }
      const { fields = {}, signatures = {} } = request;
      const allFields = { ...fields, ...signatures };

      for (const field of document.fieldValues) {
        const fieldName = field.templateField.fieldName;
        if (allFields.hasOwnProperty(fieldName)) {
          const value = allFields[fieldName];
          field.value = value?.toString();
        }
      }

      await manager.save(Document, document);
      await manager.save(DocumentFieldValue, document.fieldValues);
      return { success: true };
    }, context);
  }

  async fillTemplate(
    request: FillTemplateDto,
    user: UserDto,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      const template = await manager.findOne(TemplatesDocuments, {
        where: { id: request.templateId },
        relations: ['templateFields'],
      });

      if (!template) {
        throw new BadRequestException('Template not found');
      }

      const document = manager.create(Document, {
        createdBy: request.userId,
        updatedBy: request.userId,
        createdDate: new Date(),
        updatedDate: new Date(),
        documentTemplate: template,
        documentStatus: 'submitted',
      });

      await manager.save(Document, document);

      const allFields = { ...request.fields, ...request.signatures };

      const fieldValuesToSave: DocumentFieldValue[] = [];

      for (const templateField of template.templateFields) {
        const fieldName = templateField.fieldName;
        let value: any = allFields[fieldName];

        if (templateField.isUserData) {
          value = user[fieldName];
          if (value === undefined || value === null) {
            throw new BadRequestException(
              `User data for field '${fieldName}' not found`,
            );
          }
        }

        if (templateField.isPredefined) {
          const predefinedField = await manager.findOne(PredefinedFields, {
            where: { fieldName: fieldName },
          });
          if (predefinedField) {
            value = predefinedField.value;
          } else {
            throw new BadRequestException(
              `Predefined field '${fieldName}' not found`,
            );
          }
        }

        const fieldValue = manager.create(DocumentFieldValue, {
          document: document,
          templateField: templateField,
          value: value?.toString() || '',
        });

        fieldValuesToSave.push(fieldValue);
      }

      if (user.role === 'student') {
        const fieldValue = manager.create(DocumentFieldValue, {
          document: document,
          templateField: template.templateFields.find(
            (field) => field.fieldName === 'currentData',
          ),
          value: this.commonService.getFormatedDate(),
        });

        fieldValuesToSave.push(fieldValue);
      }

      await manager.save(DocumentFieldValue, fieldValuesToSave);
      return { success: true };
    }, context);
  }

  async getDocumentsByUserId(
    userId: string,
    context: RmqContext,
  ): Promise<{
    data: Document[];
  }> {
    return this.handleTransaction(async (manager) => {
      const documents = await manager.find(Document, {
        where: { createdBy: userId },
        relations: ['documentTemplate'],
      });

      return {
        success: true,
        data: documents,
      };
    }, context);
  }

  async deletePredefinedField(fieldName: string, context: RmqContext) {
    this.handleTransaction(async (manager) => {
      await manager.delete(PredefinedFields, { fieldName: fieldName });
    }, context);
  }

  async printDocument(
    documentId: string,
    channel: RmqContext,
  ): Promise<Buffer> {
    const channelRef = channel.getChannelRef();
    const originalMsg = channel.getMessage();
    try {
      const document = await this.handleTransaction(async (manager) => {
        const doc = await manager.findOne(Document, {
          where: { id: documentId },
          relations: [
            'fieldValues',
            'fieldValues.templateField',
            'documentTemplate',
          ],
        });
        if (!doc) {
          throw new NotFoundException('Document not found');
        }

        return doc;
      });

      const templateFileName = document.documentTemplate.templateFileName;
      const templateFileBuffer = await this.s3Service.getFile(
        templateFileName,
        'pdfdocuments',
      );

      if (!templateFileBuffer) {
        throw new NotFoundException('Template file not found');
      }

      const dataToFill: { [key: string]: any } = {};
      for (const fieldValue of document.fieldValues) {
        const fieldName = fieldValue.templateField.fieldName;
        let value = fieldValue.value;

        dataToFill[fieldName] = value;
      }

      const filledPdfBuffer = await this.pdfService.fillPdfForm(
        templateFileBuffer,
        dataToFill,
      );

      channelRef.ack(originalMsg);
      return filledPdfBuffer;
    } catch (error) {
      console.error('Error handling print_document:', error.message);
      channelRef.nack(originalMsg, false, false);
      throw error;
    }
  }

  async getFilteredDocuments(
    params: DocumentSortParams,
    context: RmqContext,
  ): Promise<{ documents: Document[]; total: number }> {
    return this.handleTransaction(async (manager) => {
      const queryBuilder = manager
        .getRepository(Document)
        .createQueryBuilder('document')
        .leftJoinAndSelect('document.documentTemplate', 'template');

      if (params.statuses && Array.isArray(params.statuses)) {
        queryBuilder.where('document.documentStatus IN (:...statuses)', {
          statuses: params.statuses,
        });
      }

      const validSortFields: DocumentSortField[] = [
        'createdDate',
        'updatedDate',
        'documentStatus',
        'templateName',
      ];

      if (params.sortField) {
        if (!validSortFields.includes(params.sortField)) {
          throw new BadRequestException('Invalid sort field');
        }

        const sortOrder = params.sortOrder || 'ASC';
        const sortColumn =
          params.sortField === 'templateName'
            ? 'template.name'
            : `document.${params.sortField}`;

        queryBuilder.orderBy(sortColumn, sortOrder);
      }

      const page = params.page > 0 ? params.page : 1;
      const pageSize = params.pageSize > 0 ? params.pageSize : 10;
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);

      const [documents, total] = await queryBuilder.getManyAndCount();

      return {
        documents: documents,
        total: total,
      };
    }, context);
  }

  async updateDocument(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const document = await this.repository.findOne({ where: { id } });
      if (!document) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      Object.assign(document, updateDocumentDto);
      Object.assign(document, { updatedDate: new Date() });
      const isStatusChanged = updateDocumentDto.documentStatus;

      await this.repository.save(document);

      if (isStatusChanged) {
        const notificationData: CreateNotificationDto = {
          userId: document.createdBy,
          documentId: document.id,
          content: `document.status.changed.${updateDocumentDto.documentStatus}`,
        };
        this.createNotification(notificationData);
      }

      channel.ack(originalMsg);
    } catch {
      channel.nack(originalMsg, false, false);
      throw new Error('Error updating document');
    }
  }

  async createPredefinedField(
    createPredefinedField: CreatePredefinedField,
    context: RmqContext,
  ) {
    this.handleTransaction(async (manager) => {
      const predefinedField = manager.create(PredefinedFields, {
        fieldName: createPredefinedField.fieldName,
        value: createPredefinedField.value,
      });

      await manager.save(PredefinedFields, predefinedField);
    }, context);
  }

  async getDocumentDetails(
    documentId: string,
    context: RmqContext,
  ): Promise<Document | null> {
    return this.handleTransaction(async (manager) => {
      const document = await manager.findOne(Document, {
        where: { id: documentId },
        relations: [
          'fieldValues',
          'fieldValues.templateField',
          'documentTemplate',
          'attachments',
        ],
      });
      return document;
    }, context);
  }

  async getAttachmentFile(
    attachmentId: string,
    context: RmqContext,
  ): Promise<{ attachmentBuffer: string; attachment: Attachment }> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const attachment = await this.handleTransaction(async (manager) => {
        return await manager.findOne(Attachment, {
          where: { id: attachmentId },
        });
      });

      if (!attachment) {
        throw new NotFoundException('Attachment not found');
      }
      const attachmentBuffer = await this.s3Service.getFile(
        attachment.fileName,
        'attachments',
      );
      const attachmentBufferBase64 = attachmentBuffer.toString('base64');
      channel.ack(originalMsg);
      return { attachmentBuffer: attachmentBufferBase64, attachment };
    } catch {
      channel.nack(originalMsg, false, false);
      throw new Error('Error getting attachment file');
    }
  }

  async createNotification(payload: CreateNotificationDto) {
    this.rabbitService.processEvent({
      pattern: 'create_notification',
      payload: payload,
      service: this.notificationServiceClient,
    });
  }

  private async handleTransaction<T>(
    operation: (manager: EntityManager) => Promise<T>,
    context?: RmqContext,
  ): Promise<T> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();

      if (context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
      }

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.nack(originalMsg, false, false);
      }

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private getIsForStudentToFill(field: TemplateField): boolean {
    return !field.isUserData && !field.isForDeanToFill && !field.isPredefined;
  }
}
