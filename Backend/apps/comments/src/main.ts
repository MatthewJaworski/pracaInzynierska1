import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  const rabbitMqService = app.get<RabbitService>(RabbitService);
  app.connectMicroservice(rabbitMqService.getOptions('COMMENTS', false));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
}
bootstrap();
