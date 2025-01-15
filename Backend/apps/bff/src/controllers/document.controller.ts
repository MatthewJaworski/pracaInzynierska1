import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { DocumentSortField } from '@app/common/types/document-sort-field';
import { SortType } from '@app/common/types/sort-type';
import { Response } from 'express';
import { UpdateDocumentDto } from '@app/common/dtos/update-document.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BffDocumentService } from '../services/document.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/api/document')
export class BffDocumentController {
  constructor(private readonly bffDocumentService: BffDocumentService) {}

  @Patch('/fields/fill')
  @UseGuards(JwtAuthGuard)
  async fillField(@Body() request: FillTemplateDto & { documentId: string }) {
    return await this.bffDocumentService.fillField(request);
  }

  @Get('/for/:userId')
  @UseGuards(JwtAuthGuard)
  async getDocuments(@Param('userId') userId: string) {
    return await this.bffDocumentService.getDocumentsByUserId(userId);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllDocuments(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('sortField') sortField: DocumentSortField,
    @Query('sortOrder') sortOrder: SortType,
    @Query('statuses') statuses: string[],
  ) {
    return await this.bffDocumentService.getFilteredDocuments({
      page,
      pageSize,
      sortField,
      sortOrder,
      statuses,
    });
  }

  @Get('/:documentId')
  @UseGuards(JwtAuthGuard)
  async getDocumentDetails(@Param('documentId') documentId: string) {
    return await this.bffDocumentService.getDocumentDetails(documentId);
  }

  @Get('/attachment/:attachmentId')
  @UseGuards(JwtAuthGuard)
  async getAttachment(
    @Param('attachmentId') attachmentId: string,
    @Res() res: Response,
  ) {
    try {
      const { attachmentBuffer, attachment } =
        await this.bffDocumentService.getAttachmentFile(attachmentId);

      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${attachment.fileName}"`,
        'Content-Length': attachmentBuffer.length,
      });

      res.send(attachmentBuffer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        console.error('Error handling get_attachment:', error.message);
        res.status(500).send({ success: false, message: error.message });
      }
    }
  }

  @Post('/template/pdf/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdfTemplateDocument(@UploadedFile() file: Express.Multer.File) {
    return await this.bffDocumentService.uploadPdfTemplateDocument(file);
  }

  @Put('/update/:documentId')
  @UseGuards(JwtAuthGuard)
  async updateDocument(
    @Param('documentId') documentId: string,
    @Body() request: UpdateDocumentDto,
  ) {
    return await this.bffDocumentService.updateDocument(documentId, request);
  }

  @Post('/attachment')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async addAttachment(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() request: { documentId: string },
  ) {
    return await this.bffDocumentService.addAttachment(
      files,
      request.documentId,
    );
  }

  @Get('/print/:documentId')
  @UseGuards(JwtAuthGuard)
  async printDocument(
    @Param('documentId') documentId: string,
    @Res() res: Response,
  ) {
    try {
      let pdfBuffer = await this.bffDocumentService.printDocument(documentId);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="document_${documentId}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        console.error('Error handling print_document:', error.message);
        res.status(500).send({ success: false, message: error.message });
      }
    }
  }
}
