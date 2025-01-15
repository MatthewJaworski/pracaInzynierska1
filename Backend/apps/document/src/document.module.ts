import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { Document } from 'libs/common/entities/Document';
import { TemplatesDocuments } from 'libs/common/entities/TemplatesDocuments';
import { S3Service } from './aws/S3.service';
import { TemplateField } from 'libs/common/entities/TemplateField';
import { PdfService } from './pdf/pdf.service';
import { PredefinedFields } from 'libs/common/entities/PredefinedFields';
import { DocumentFieldValue } from 'libs/common/entities/DocumentFieldValue';
import { Attachment } from 'libs/common/entities/Attachment';
import { CommonService } from '@app/common';
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
        RABBITMQ_DOCUMENTS_QUEUE: joi.string().required(),
        AWS_ACCESS_KEY_ID: joi.string().required(),
        AWS_SECRET_ACCESS_KEY: joi.string().required(),
        AWS_REGION: joi.string().default('us-east-1'),
        MINIO_ENDPOINT: joi.string().required(),
        MINIO_BUCKET: joi.string().required(),
        MINIO_USE_SSL: joi.boolean().default(false),
      }),
      envFilePath: './apps/document/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Document,
        TemplatesDocuments,
        TemplateField,
        PredefinedFields,
        DocumentFieldValue,
        Attachment,
      ],
      synchronize: true,
      logging: true,
    }),
    RabbitModule,
    RabbitModule.register({ name: NOTIFICATIONS_SERVICE }),
    TypeOrmModule.forFeature([
      Document,
      TemplatesDocuments,
      TemplateField,
      PredefinedFields,
      DocumentFieldValue,
      Attachment,
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, S3Service, PdfService, CommonService],
})
export class DocumentModule {}
