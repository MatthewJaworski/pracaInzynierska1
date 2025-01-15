import { NestFactory } from '@nestjs/core';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthorizationModule);
  const rabbitMqService = app.get<RabbitService>(RabbitService);
  app.connectMicroservice(rabbitMqService.getOptions('USERS', false));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
