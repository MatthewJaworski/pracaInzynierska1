import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../libs/common/entities/User';
import { RabbitModule } from '@app/common/rabbitmq/rabbit.module';
import { AuthModule } from '@app/common';
import { EMAIL_SERVICE } from '@app/common/constants/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RabbitModule,
    AuthModule,
    RabbitModule.register({ name: EMAIL_SERVICE }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
