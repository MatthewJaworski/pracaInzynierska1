import { Controller } from '@nestjs/common';
import { DocumentService } from './document.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTemplateDto } from '@app/common/dtos/create-template.dto';
import { UploadPDFTemplateDTO } from '@app/common/dtos/upload-pdf-template.dto';
import { TemplatesDocuments } from 'libs/common/entities/TemplatesDocuments';
import { UpdateTemplateDto } from '@app/common/dtos/update-template.dto';
import { TemplateField } from 'libs/common/entities/TemplateField';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { UserDto } from '@app/common/dtos/user.dto';
import { Document } from 'libs/common/entities/Document';
import { DocumentSortParams } from '@app/common/dtos/document-sorting-params';
import { UpdateDocumentDto } from '@app/common/dtos/update-document.dto';
import { CreatePredefinedField } from '@app/common/dtos/create-predfefined-fields.dto';
import { PredefinedFields } from 'libs/common/entities/PredefinedFields';
import { Attachment } from 'libs/common/entities/Attachment';

@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @MessagePattern('create_template')
  createTemplate(
    @Payload()
    createTemplate: CreateTemplateDto & { file: Express.Multer.File },
    @Ctx() context: RmqContext,
  ) {
    return this.documentService.createTemplate(createTemplate, context);
  }

  @MessagePattern('get_templates')
  getTemplates(
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: TemplatesDocuments[] }> {
    return this.documentService.getTemplates(context);
  }

  @MessagePattern('get_template')
  getTemplate(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: TemplatesDocuments }> {
    return this.documentService.getTemplate(id, context);
  }

  @MessagePattern('get_templates_for_student')
  getTemplatesForStudent(@Ctx() context: RmqContext): Promise<{
    success: boolean;
    data: TemplatesDocuments[];
  }> {
    return this.documentService.getTemplatesForStudent(context);
  }

  @MessagePattern('get_template_pdfs')
  getTemplatePDFs(
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: string[] }> {
    return this.documentService.getTemplatePDFs(context);
  }

  @EventPattern('create_predefined_field')
  createPredefinedField(
    @Payload() createPredefinedField: CreatePredefinedField,
    @Ctx() context: RmqContext,
  ) {
    this.documentService.createPredefinedField(createPredefinedField, context);
  }

  @MessagePattern('get_predefined_fields')
  getPredefinedFields(
    @Payload() paylod: { page: number; pageSize: number },
    @Ctx() context: RmqContext,
  ): Promise<{
    fields: PredefinedFields[];
    total: number;
  }> {
    return this.documentService.getFields(paylod, context);
  }

  @EventPattern('delete_predefined_field')
  deletePredefinedField(
    @Payload() fieldName: string,
    @Ctx() context: RmqContext,
  ) {
    this.documentService.deletePredefinedField(fieldName, context);
  }

  @EventPattern('update_predefined_field')
  updatePredefinedField(
    @Payload() updatePredefinedField: CreatePredefinedField,
    @Ctx() context: RmqContext,
  ) {
    this.documentService.updatePredefinedField(updatePredefinedField, context);
  }

  @EventPattern('update_template')
  updateTemplate(
    @Payload()
    updateTemplate: UpdateTemplateDto & { file?: Express.Multer.File },
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean }> {
    return this.documentService.updateTemplate(updateTemplate, context);
  }

  @EventPattern('delete_template')
  deleteTemplate(@Payload() id: string, @Ctx() context: RmqContext) {
    this.documentService.deleteTemplate(id, context);
  }

  @MessagePattern('fill_template')
  fillTemplate(
    @Payload() data: { request: FillTemplateDto; user: UserDto },
    @Ctx() context: RmqContext,
  ) {
    return this.documentService.fillTemplate(data.request, data.user, context);
  }

  @MessagePattern('fill_field')
  fillField(
    @Payload() data: FillTemplateDto & { documentId: string },
    @Ctx() context: RmqContext,
  ) {
    const { documentId, ...rest } = data;
    return this.documentService.updateDocumentFields(rest, documentId, context);
  }

  @MessagePattern('upload_pdf_template')
  async handleSavePDFTemplate(
    @Payload() UploadPDFTemplateDTO: UploadPDFTemplateDTO,
    @Ctx() context: RmqContext,
  ) {
    return await this.documentService.savePDFTemplate(
      UploadPDFTemplateDTO,
      context,
    );
  }

  @MessagePattern('get_template_fields')
  async getTemplateFields(
    @Payload() payload: { templateId: string; userType: 'student' | 'dean' },
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: TemplateField[] }> {
    return this.documentService.getTemplateFields(payload, context);
  }

  @MessagePattern('get_documents_by_user_id')
  async getDocumentsByUserId(
    @Payload() userId: string,
    @Ctx() context: RmqContext,
  ): Promise<{ data: Document[] }> {
    return this.documentService.getDocumentsByUserId(userId, context);
  }

  @MessagePattern('print_document')
  async printDocument(
    @Payload() documentId: string,
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: Buffer }> {
    try {
      const result = await this.documentService.printDocument(
        documentId,
        context,
      );
      return { success: true, data: result };
    } catch (error) {
      console.error('Error handling print_document:', error);
      return { success: false, data: null };
    }
  }

  @MessagePattern('get_filtered_documents')
  async getFilteredDocuments(
    @Payload()
    params: DocumentSortParams,
    @Ctx() context: RmqContext,
  ): Promise<{ documents: Document[]; total: number }> {
    return await this.documentService.getFilteredDocuments(params, context);
  }

  @EventPattern('update_document')
  async updateDocument(
    @Payload()
    data: {
      documentId: string;
      request: UpdateDocumentDto;
    },
    @Ctx() context: RmqContext,
  ) {
    this.documentService.updateDocument(data.documentId, data.request, context);
  }

  @MessagePattern('get_document_details')
  async getDocumentDetails(
    @Payload() documentId: string,
    @Ctx() context: RmqContext,
  ): Promise<Document | null> {
    return this.documentService.getDocumentDetails(documentId, context);
  }

  @MessagePattern('add_attachment')
  async addAttachment(
    @Payload() data: { documentId: string; files: Express.Multer.File[] },
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean }> {
    return this.documentService.addAttachmentToDocument(
      data.documentId,
      data.files,
      context,
    );
  }

  @MessagePattern('get_attachment_file')
  async getAttachmentFile(
    @Payload() attachmentId: string,
    @Ctx() context: RmqContext,
  ): Promise<{ attachmentBuffer: string; attachment: Attachment }> {
    return this.documentService.getAttachmentFile(attachmentId, context);
  }
}
