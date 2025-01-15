import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from '@app/common/dtos/update-user.dto';
import { Role } from '@app/common/types/role';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('create_user')
  async handleUserCreated(
    @Payload() data: CreateUserDto,
    @Ctx() context: RmqContext,
  ) {
    return await this.userService.createUser(data, context);
  }

  @MessagePattern('create_user_many')
  async handleUsersCreated(
    @Payload() data: CreateUserDto[],
    @Ctx() context: RmqContext,
  ) {
    return await this.userService.createUserMany(data, context);
  }

  @MessagePattern('get_user')
  async handleGetUser(@Payload() id: string, @Ctx() context: RmqContext) {
    return await this.userService.getUser(id, context);
  }

  @EventPattern('update_user')
  async handleUpdateUser(
    @Payload() data: UpdateUserDto,
    @Ctx() context: RmqContext,
  ) {
    await this.userService.updateUser(data, context);
  }

  @MessagePattern('get_users_by_role')
  async handleGetUsersByRole(
    @Payload() payload: { role: Role; safeData?: 'true' },
    @Ctx() context: RmqContext,
  ) {
    return await this.userService.getUsersByRole(payload, context);
  }
}
