import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BffNotificationService } from '../services/notification.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/api/notification')
export class BffNotificationController {
  constructor(
    private readonly bffNotificationService: BffNotificationService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getNotifications(
    @Query('userId') userId: string,
    @Query('documentId') documentId?: string,
    @Query('id') id?: string,
  ) {
    return await this.bffNotificationService.getNotifications({
      userId,
      documentId,
      id,
    });
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  async deleteNotification(@Query('id') id?: string) {
    await this.bffNotificationService.deleteNotification({ id });
    return HttpStatus.ACCEPTED;
  }
}
