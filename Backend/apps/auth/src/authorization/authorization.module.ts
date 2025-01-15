import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../libs/common/entities/User';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { AuthorizationController } from './authorization.controller';
import { ActivationToken } from 'libs/common/entities/ActivationAccount';

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
        PORT: joi.string().required(),
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_USERS_QUEUE: joi.string().required(),
        JWT_SECRET_KEY: joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, ActivationToken],
      synchronize: true,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RabbitModule,
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtStrategy, LocalStrategy],
})
export class AuthorizationModule {}
