import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { RabbitService } from '../rabbitmq/rabbit.service';

@Module({
  providers: [RabbitService, CommonService],
  exports: [RabbitService, CommonService],
})
export class CommonModule {}
