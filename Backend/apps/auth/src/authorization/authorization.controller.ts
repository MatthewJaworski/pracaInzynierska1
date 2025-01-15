import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { CurrentUser } from '../current-user-decorator';
import { User } from '../../../../libs/common/entities/User';
import { AuthorizationService } from './authorization.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res() response: Response) {
    await this.authorizationService.login(user, response);
    const { password, ...safeUser } = user;
    return response.send(safeUser);
  }

  @Post('refresh')
  async refreshTokens(@Req() request: Request, @Res() response: Response) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const refreshToken = authHeader.split(' ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    await this.authorizationService.refreshTokens(refreshToken, response);
    return response.send({ message: 'Tokens refreshed' });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return user;
  }

  @Post('/activate-account')
  async activateAccount(@Body() request: { token: string; password: string }) {
    return await this.userService.activateUser(request);
  }
}
