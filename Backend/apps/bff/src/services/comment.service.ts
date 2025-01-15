import { COMMENTS_SERVICE } from '@app/common/constants/services';
import { CreateCommentDto } from '@app/common/dtos/create-comment.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BffCommentService {
  constructor(
    @Inject(COMMENTS_SERVICE)
    private readonly commentServiceClient: ClientProxy,
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async addComment(request: CreateCommentDto) {
    await this.rabbitService.processEvent({
      pattern: 'add_comment',
      payload: request,
      service: this.commentServiceClient,
    });

    return HttpStatus.ACCEPTED;
  }

  async getCommentsByDocumentId(documentId: string) {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_comments_by_document_id',
      payload: documentId,
      service: this.commentServiceClient,
    });
    return result.data;
  }
}
