import { DOCUMENTS_SERVICE } from '@app/common/constants/services';
import { CreateTemplateDto } from '@app/common/dtos/create-template.dto';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { UpdateTemplateDto } from '@app/common/dtos/update-template.dto';
import { UserDto } from '@app/common/dtos/user.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TemplatesDocuments } from 'libs/common/entities/TemplatesDocuments';

@Injectable()
export class BffTemplateService {
  constructor(
    @Inject(DOCUMENTS_SERVICE)
    private readonly documentServiceClient: ClientProxy,
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async getTemplates(): Promise<string[]> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_templates',
      payload: {},
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async getTemplatesForStudent(): Promise<TemplatesDocuments[]> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_templates_for_student',
      payload: {},
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async getTemplate(id: string): Promise<string> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_template',
      payload: id,
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async getTemplatePdfs(): Promise<string[]> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_template_pdfs',
      payload: {},
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async updateTemplate(request: UpdateTemplateDto, file: Express.Multer.File) {
    await this.rabbitService.processEvent({
      pattern: 'update_template',
      payload: { ...request, file },
      service: this.documentServiceClient,
    });
  }

  async createTemplate(request: CreateTemplateDto, file: Express.Multer.File) {
    return await this.rabbitService.processRequest({
      pattern: 'create_template',
      payload: { ...request, file },
      service: this.documentServiceClient,
    });
  }

  async getTemplateFields(
    templateId: string,
    userType: 'student' | 'dean',
  ): Promise<string> {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_template_fields',
      payload: { templateId, userType },
      service: this.documentServiceClient,
    });
    return result.data;
  }

  async saveTemplateData(request: FillTemplateDto, user: UserDto) {
    return await this.rabbitService.processRequest({
      pattern: 'fill_template',
      payload: { request, user },
      service: this.documentServiceClient,
    });
  }

  async deleteTemplate(id: string) {
    await this.rabbitService.processEvent({
      pattern: 'delete_template',
      payload: id,
      service: this.documentServiceClient,
    });
  }
}
