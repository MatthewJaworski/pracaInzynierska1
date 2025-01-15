import { CreateNotificationDto } from '@app/common/dtos/create-notification.dto';
import { DeleteNotificationParamsDto } from '@app/common/dtos/delete-notification-params.dto';
import { GetNotificationsParamsDto } from '@app/common/dtos/get-notifications-params.dto';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'libs/common/entities/Notification';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async addNotification(
    notification: CreateNotificationDto,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      await manager.save(Notification, notification);
      return { success: true };
    }, context);
  }

  async getNotifications(
    params: GetNotificationsParamsDto,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      const whereConditions = [];

      if (params.userId) {
        whereConditions.push({ userId: params.userId });
      }

      if (params.documentId) {
        whereConditions.push({ documentId: params.documentId });
      }

      if (params.id) {
        whereConditions.push({ id: params.id });
      }

      const notifications = await manager.find(Notification, {
        where: whereConditions.length > 0 ? whereConditions : {},
      });

      return { success: true, data: notifications };
    }, context);
  }

  async deleteNotification(
    param: DeleteNotificationParamsDto,
    context: RmqContext,
  ) {
    return this.handleTransaction(async (manager) => {
      await manager.delete(Notification, { id: param.id });
    }, context);
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
