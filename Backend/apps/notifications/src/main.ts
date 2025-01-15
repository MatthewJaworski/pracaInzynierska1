import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rabbitMqService = app.get<RabbitService>(RabbitService);
  app.connectMicroservice(rabbitMqService.getOptions('NOTIFICATIONS', false));
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
}
bootstrap();
