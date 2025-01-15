import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DocumentModule);
  const rabbitMqService = app.get<RabbitService>(RabbitService);
  app.connectMicroservice(rabbitMqService.getOptions('DOCUMENTS', false));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.startAllMicroservices();
}
bootstrap();
