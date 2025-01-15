import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../libs/common/entities/User';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '@app/common/dtos/update-user.dto';
import { Role } from '@app/common/types/role';
import { UserDto, userToDto } from '@app/common/dtos/user.dto';
import { randomBytes } from 'crypto';
import { ActivationToken } from 'libs/common/entities/ActivationAccount';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { EMAIL_SERVICE } from '@app/common/constants/services';
import { ValidationError } from 'class-validator';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @Inject(EMAIL_SERVICE)
    private readonly emailClient: ClientProxy,
  ) {}

  async createUser(request: CreateUserDto, context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    return this.handleTransaction(async (manager) => {
      const user = manager.create(User, {
        ...request,
      });

      await manager.save(User, user);

      const activationToken = randomBytes(32).toString('hex');

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const tokenEntity = manager.create(ActivationToken, {
        email: user.email,
        activationToken,
        expiresAt,
      });
      await manager.save(ActivationToken, tokenEntity);

      const activationLink = `${process.env.LOCAL_FRONTEND_URL}/activate?token=${activationToken}`;

      this.emailClient.emit('send_email', {
        to: user.email,
        subject: 'Activate Your Account',
        text: `Please click the following link to activate your account: ${activationLink}`,
      });

      channel.ack(originalMsg);
    });
  }

  async createUserMany(requests: CreateUserDto[], context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const activationData: { email: string; activationToken: string }[] = [];
    const errors: {
      email: string;
      error: string;
      details?: ValidationError[];
    }[] = [];

    await this.handleTransaction(async (manager) => {
      for (const request of requests) {
        const user = manager.create(User, {
          ...request,
          semester: Number(request.semester),
          year: Number(request.year),
        });

        try {
          await manager.save(User, user);

          const activationToken = randomBytes(32).toString('hex');
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

          const tokenEntity = manager.create(ActivationToken, {
            email: user.email,
            activationToken,
            expiresAt,
          });
          await manager.save(ActivationToken, tokenEntity);

          activationData.push({
            email: user.email,
            activationToken,
          });
        } catch (error) {
          errors.push({
            email: request.email,
            error: error.message,
          });
          channel.nack(originalMsg, false, false);
          throw error;
        }
      }
    });

    for (const { email, activationToken } of activationData) {
      const activationLink = `${process.env.FRONTEND_URL}/activate?token=${activationToken}`;

      this.emailClient.emit('send_email', {
        to: email,
        subject: 'Activate Your Account',
        text: `Please click the following link to activate your account: ${activationLink}`,
      });
    }

    channel.ack(originalMsg);
    return { success: true };
  }

  async activateUser({ token, password }: { token: string; password: string }) {
    return this.handleTransaction(async (manager) => {
      const tokenEntity = await manager.findOne(ActivationToken, {
        where: { activationToken: token },
      });

      if (!tokenEntity || new Date() > tokenEntity.expiresAt) {
        throw new BadRequestException('Invalid or expired activation token.');
      }

      const user = await manager.findOne(User, {
        where: { email: tokenEntity.email },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      user.password = await bcrypt.hash(password, 10);
      await manager.save(User, user);

      await manager.delete(ActivationToken, { id: tokenEntity.id });
    });
  }

  async updateUser(request: UpdateUserDto, context: RmqContext) {
    this.handleTransaction(async (manager) => {
      const user = await manager.preload(User, { ...request });

      if (!user) {
        throw new Error('User not found');
      }

      await manager.save(User, user);
    }, context);
  }

  async getUser(id: string, context: RmqContext) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      return { success: false, data: null };
    }

    const { password, ...userWithoutPassword } = user;

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return { success: true, data: userWithoutPassword };
  }

  async getUsersByRole(
    {
      role,
      safeData,
    }: {
      role: Role;
      safeData?: 'true';
    },
    context: RmqContext,
  ): Promise<UserDto[] | User[] | undefined> {
    const users = this.repository.find({ where: { role } });

    if (safeData === 'true') {
      return users.then((users) => users.map((user) => userToDto(user)));
    }

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return users;
  }

  async getUserByEmail(
    email: string,
    context?: RmqContext,
  ): Promise<User | undefined> {
    const result = this.repository.findOne({ where: { email } });

    if (context) {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    }

    return result;
  }

  async getUserById(
    id: string,
    context?: RmqContext,
  ): Promise<User | undefined> {
    const result = this.repository.findOne({ where: { id } });

    if (context) {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    }

    return result;
  }

  private async handleTransaction<T>(
    operation: (manager: EntityManager) => Promise<T>,
    context?: RmqContext,
  ): Promise<T> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();

      if (context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
      }

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg, false, false);
      }

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
