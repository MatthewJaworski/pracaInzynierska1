import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateCommentDto } from '@app/common/dtos/create-comment.dto';
import { Comment } from 'libs/common/entities/Comment';
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern('add_comment')
  addComment(
    @Payload() comment: CreateCommentDto,
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean }> {
    return this.commentsService.addComment(comment, context);
  }

  @MessagePattern('get_comments_by_document_id')
  getCommentsByDocumentId(
    @Payload() documentId: string,
    @Ctx() context: RmqContext,
  ): Promise<{ success: boolean; data: Comment[] }> {
    return this.commentsService.getCommentsByDocumentId(documentId, context);
  }
}
