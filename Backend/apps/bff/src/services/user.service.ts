import { AUTH_SERVICE } from '@app/common/constants/services';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { UpdateUserDto } from '@app/common/dtos/update-user.dto';
import { UserDto } from '@app/common/dtos/user.dto';
import { RabbitService } from '@app/common/rabbitmq/rabbit.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'aws-sdk/clients/appstream';
import { Role } from 'aws-sdk/clients/budgets';

@Injectable()
export class BffUserService {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authServiceClient: ClientProxy,
    @Inject() private readonly rabbitService: RabbitService,
  ) {}

  async createUser(request: CreateUserDto): Promise<number> {
    await this.rabbitService.processEvent({
      pattern: 'create_user',
      payload: request,
      service: this.authServiceClient,
    });
    return HttpStatus.ACCEPTED;
  }

  async createUserMany(request: CreateUserDto[]): Promise<number> {
    const result = await this.rabbitService.processRequest<{
      success: boolean;
    }>({
      pattern: 'create_user_many',
      payload: request,
      service: this.authServiceClient,
    });
    return result.success
      ? HttpStatus.CREATED
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  async getUsersByRole(
    role: Role,
    safeData?: 'true',
  ): Promise<UserDto[] | User[]> {
    const result = await this.rabbitService.processRequest<UserDto[] | User[]>({
      pattern: 'get_users_by_role',
      payload: { role, safeData },
      service: this.authServiceClient,
    });

    return result;
  }

  async getUser(id: string): Promise<UserDto | number> {
    const result = await this.rabbitService.processRequest<{
      success: boolean;
      data: UserDto;
    }>({ pattern: 'get_user', payload: id, service: this.authServiceClient });
    return result.success ? result.data : HttpStatus.NOT_FOUND;
  }

  async updateUser(request: UpdateUserDto) {
    await this.rabbitService.processEvent({
      pattern: 'update_user',
      payload: request,
      service: this.authServiceClient,
    });
  }
}
