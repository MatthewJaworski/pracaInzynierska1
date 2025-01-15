import { RabbitModule } from '../rabbitmq/rabbit.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AUTH_SERVICE } from '../constants/services';

@Module({
  imports: [RabbitModule.register({ name: AUTH_SERVICE })],
  exports: [RabbitModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
