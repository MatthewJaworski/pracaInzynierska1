import { DOCUMENTS_SERVICE } from '@app/common/constants/services';
import { CreatePredefinedField } from '@app/common/dtos/create-predfefined-fields.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PredefinedFields } from 'libs/common/entities/PredefinedFields';

@Injectable()
export class BffFieldsService {
  constructor(
    @Inject(DOCUMENTS_SERVICE)
    private readonly documentServiceClient: ClientProxy,
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async getFields(data: {
    page: number;
    pageSize: number;
  }): Promise<{ fields: PredefinedFields[]; total: number }> {
    const result = await this.rabbitService.processRequest<{
      fields: PredefinedFields[];
      total: number;
    }>({
      pattern: 'get_predefined_fields',
      payload: data,
      service: this.documentServiceClient,
    });
    return result;
  }

  async deletePredefinedField(fieldName: string) {
    await this.rabbitService.processEvent({
      pattern: 'delete_predefined_field',
      payload: fieldName,
      service: this.documentServiceClient,
    });
  }

  async updatePredefinedField(request: CreatePredefinedField) {
    await this.rabbitService.processEvent({
      pattern: 'update_predefined_field',
      payload: request,
      service: this.documentServiceClient,
    });
  }

  async createPredefinedField(request: CreatePredefinedField) {
    await this.rabbitService.processEvent({
      pattern: 'create_predefined_field',
      payload: request,
      service: this.documentServiceClient,
    });
  }
}
