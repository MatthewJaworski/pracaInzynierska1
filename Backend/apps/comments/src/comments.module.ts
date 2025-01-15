import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import * as joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { Comment } from '../../../libs/common/entities/Comment';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants/services';

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
        RABBITMQ_COMMENTS_QUEUE: joi.string().required(),
      }),
      envFilePath: './apps/comments/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Comment],
      synchronize: true,
      logging: true,
    }),
    RabbitModule,
    RabbitModule.register({ name: NOTIFICATIONS_SERVICE }),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
