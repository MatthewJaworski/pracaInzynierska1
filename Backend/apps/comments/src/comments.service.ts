import { NOTIFICATIONS_SERVICE } from '@app/common/constants/services';
import { CreateCommentDto } from '@app/common/dtos/create-comment.dto';
import { CreateNotificationDto } from '@app/common/dtos/create-notification.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'libs/common/entities/Comment';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly repository: Repository<Comment>,
    @Inject() private readonly rabbitService: RabbitService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationServiceClient: ClientProxy,
  ) {}

  async addComment(
    comment: CreateCommentDto,
    context: RmqContext,
  ): Promise<{ success: boolean }> {
    return this.handleTransaction(async (manager) => {
      await manager.save(Comment, comment);
      if (comment.assignedId !== comment.userId && comment.assignedId) {
        this.createNotification({
          userId: comment.assignedId,
          documentId: comment.documentId,
          content: 'comment.added',
        });
      }
      this.createNotification({
        userId: comment.userNotificationId,
        documentId: comment.documentId,
        content: 'comment.added',
      });
      return { success: true };
    }, context);
  }

  async getCommentsByDocumentId(
    documentId: string,
    context: RmqContext,
  ): Promise<{ success: boolean; data: Comment[] }> {
    return this.handleTransaction(async (manager) => {
      const comments = await manager.find(Comment, { where: { documentId } });
      return { success: true, data: comments };
    }, context);
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
}
