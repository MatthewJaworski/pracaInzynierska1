import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import * as joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { Notification } from 'libs/common/entities/Notification';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_PORT: joi.string().required(),
        DATABASE_HOST: joi.string().required(),
        DATABASE_PASSWORD: joi.string().required(),
        DATABASE_NAME: joi.string().required(),
        DATABASE_USERNAME: joi.string().required(),
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_NOTIFICATIONS_QUEUE: joi.string().required(),
      }),
      envFilePath: './apps/notifications/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Notification],
      synchronize: true,
      logging: true,
    }),
    RabbitModule,
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
