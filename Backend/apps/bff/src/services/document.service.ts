import { DOCUMENTS_SERVICE } from '@app/common/constants/services';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { UpdateDocumentDto } from '@app/common/dtos/update-document.dto';
import { UploadPDFTemplateDTO } from '@app/common/dtos/upload-pdf-template.dto';
import { DocumentSortField } from '@app/common/types/document-sort-field';
import { SortType } from '@app/common/types/sort-type';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Attachment } from 'libs/common/entities/Attachment';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';

@Injectable()
export class BffDocumentService {
  constructor(
    @Inject(DOCUMENTS_SERVICE)
    private readonly documentServiceClient: ClientProxy,
    @Inject('ACCEPTED_FILE_TYPES') private readonly acceptedFileTypes: string[],
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async fillField(request: FillTemplateDto & { documentId: string }) {
    return await this.rabbitService.processRequest({
      pattern: 'fill_field',
      payload: request,
      service: this.documentServiceClient,
    });
  }

  async getDocumentsByUserId(userId: string) {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_documents_by_user_id',
      payload: userId,
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async getFilteredDocuments(params: {
    page: number;
    pageSize: number;
    sortField: DocumentSortField;
    sortOrder: SortType;
    statuses: string[];
  }) {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_filtered_documents',
      payload: params,
      service: this.documentServiceClient,
    });
    return result;
  }

  async getDocumentDetails(documentId: string): Promise<Document> {
    const result = await this.rabbitService.processRequest<Document>({
      pattern: 'get_document_details',
      payload: documentId,
      service: this.documentServiceClient,
    });
    return result;
  }

  async getAttachmentFile(
    attachmentId: string,
  ): Promise<{ attachmentBuffer: Buffer; attachment: Attachment }> {
    const result = await this.rabbitService.processRequest<{
      attachmentBuffer: string;
      attachment: Attachment;
    }>({
      pattern: 'get_attachment_file',
      payload: attachmentId,
      service: this.documentServiceClient,
    });

    try {
      const { attachmentBuffer: attachmentBufferBase64, attachment } = result;
      const attachmentBufferRes = Buffer.from(attachmentBufferBase64, 'base64');

      return { attachmentBuffer: attachmentBufferRes, attachment };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Attachment not found');
      } else {
        console.error('Error in getAttachmentFile:', error.message);
        throw new InternalServerErrorException('Failed to retrieve attachment');
      }
    }
  }

  async uploadPdfTemplateDocument(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!this.acceptedFileTypes.includes(file.mimetype))
      throw new BadRequestException('Invalid file type');

    const UploadPDFTemplateDTO: UploadPDFTemplateDTO = {
      filename: file.originalname,
      mimetype: file.mimetype,
      fileData: file.buffer.toString('base64'),
    };
    const result = await this.uploadDocument(UploadPDFTemplateDTO);
    return result;
  }

  async updateDocument(documentId: string, request: UpdateDocumentDto) {
    await this.rabbitService.processEvent({
      pattern: 'update_document',
      payload: { documentId, request },
      service: this.documentServiceClient,
    });
  }

  async addAttachment(
    files: Express.Multer.File[],
    documentId: string,
  ): Promise<string> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'add_attachment',
      payload: { files, documentId },
      service: this.documentServiceClient,
    });
    return result.data;
  }

  private async uploadDocument(
    request: UploadPDFTemplateDTO,
  ): Promise<{ message: string }> {
    const result = await this.rabbitService.processRequest<{
      success: boolean;
    }>({
      pattern: 'upload_pdf_template',
      payload: request,
      service: this.documentServiceClient,
    });
    if (result.success) {
      return { message: 'Document uploaded successfully' };
    } else {
      throw new InternalServerErrorException('Failed to upload document');
    }
  }

  async printDocument(documentId: string) {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'print_document',
      payload: documentId,
      service: this.documentServiceClient,
    });
    try {
      let pdfBuffer = result.data;
      if (!pdfBuffer) {
        throw new InternalServerErrorException('Failed to print document');
      }
      if (pdfBuffer && pdfBuffer.type === 'Buffer') {
        pdfBuffer = Buffer.from(pdfBuffer.data);
      }
      return pdfBuffer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Document not found');
      } else {
        throw new InternalServerErrorException('Failed to print document');
      }
    }
  }
}
