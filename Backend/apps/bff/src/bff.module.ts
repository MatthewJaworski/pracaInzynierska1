import { Module } from '@nestjs/common';
import { BffService } from './bff.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AuthModule, CommonModule } from '@app/common';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import {
  AUTH_SERVICE,
  COMMENTS_SERVICE,
  DOCUMENTS_SERVICE,
  EMAIL_SERVICE,
  NOTIFICATIONS_SERVICE,
} from '@app/common/constants/services';
import { ACCEPTED_FILE_TYPES } from '@app/common/constants/accepted-file-types';
import { BffController } from './controllers/bff.controller';
import { BffNotificationController } from './controllers/notification.controller';
import { BffCommentController } from './controllers/comment.controller';
import { BffFieldsController } from './controllers/fields.controller';
import { BffDocumentController } from './controllers/document.controller';
import { BffTemplateController } from './controllers/template.controller';
import { BffUserController } from './controllers/user.controller';
import { BffCommentService } from './services/comment.service';
import { BffDocumentService } from './services/document.service';
import { BffFieldsService } from './services/fields.service';
import { BffNotificationService } from './services/notification.service';
import { BffTemplateService } from './services/template.service';
import { BffUserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string().required(),
        JWT_SECRET_KEY: joi.string().required(),
        JWT_EXPIRATION_TIME: joi.string().required(),
      }),
      envFilePath: './apps/bff/.env',
    }),
    RabbitModule.register({ name: AUTH_SERVICE }),
    RabbitModule.register({ name: DOCUMENTS_SERVICE }),
    RabbitModule.register({ name: COMMENTS_SERVICE }),
    RabbitModule.register({ name: NOTIFICATIONS_SERVICE }),
    RabbitModule.register({ name: EMAIL_SERVICE }),
    CommonModule,
    AuthModule,
  ],
  controllers: [
    BffController,
    BffNotificationController,
    BffCommentController,
    BffFieldsController,
    BffDocumentController,
    BffTemplateController,
    BffUserController,
  ],
  providers: [
    BffService,
    BffCommentService,
    BffDocumentService,
    BffFieldsService,
    BffNotificationService,
    BffUserService,
    BffTemplateService,
    {
      provide: 'ACCEPTED_FILE_TYPES',
      useValue: ACCEPTED_FILE_TYPES,
    },
  ],
})
export class BffModule {}
