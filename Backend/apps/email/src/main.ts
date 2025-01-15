import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  const rabbitMqService = app.get<RabbitService>(RabbitService);
  app.connectMicroservice(rabbitMqService.getOptions('EMAIL', false));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
}
bootstrap();
