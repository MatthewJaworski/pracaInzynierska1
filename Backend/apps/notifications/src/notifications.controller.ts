import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateNotificationDto } from '@app/common/dtos/create-notification.dto';
import { GetNotificationsParamsDto } from '@app/common/dtos/get-notifications-params.dto';
import { DeleteNotificationParamsDto } from '@app/common/dtos/delete-notification-params.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('create_notification')
  async createNotification(
    @Payload() data: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    return this.notificationsService.addNotification(data, context);
  }

  @MessagePattern('get_notifications')
  async getNotifications(
    @Payload() data: GetNotificationsParamsDto,
    @Ctx() context: RmqContext,
  ) {
    return this.notificationsService.getNotifications(data, context);
  }

  @EventPattern('delete_notification')
  async deleteNotification(
    @Payload() data: DeleteNotificationParamsDto,
    @Ctx() context: RmqContext,
  ) {
    this.notificationsService.deleteNotification(data, context);
  }
}
