import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import * as joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_EMAIL_QUEUE: joi.string().required(),
      }),
      envFilePath: './apps/email/.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('SMTP_FROM_EMAIL'),
        },
      }),
      inject: [ConfigService],
    }),
    RabbitModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
