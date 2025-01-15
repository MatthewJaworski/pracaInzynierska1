import { NOTIFICATIONS_SERVICE } from '@app/common/constants/services';
import { DeleteNotificationParamsDto } from '@app/common/dtos/delete-notification-params.dto';
import { GetNotificationsParamsDto } from '@app/common/dtos/get-notifications-params.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BffNotificationService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationServiceClient: ClientProxy,
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async getNotifications(params: GetNotificationsParamsDto) {
    const result = await this.rabbitService.processRequest<{ data: any }>({
      pattern: 'get_notifications',
      payload: params,
      service: this.notificationServiceClient,
    });
    return result.data;
  }

  async deleteNotification(params: DeleteNotificationParamsDto) {
    await this.rabbitService.processEvent({
      pattern: 'delete_notification',
      payload: params,
      service: this.notificationServiceClient,
    });
    return HttpStatus.ACCEPTED;
  }
}
