import { NestFactory } from '@nestjs/core';
import { BffModule } from './bff.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BffModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
