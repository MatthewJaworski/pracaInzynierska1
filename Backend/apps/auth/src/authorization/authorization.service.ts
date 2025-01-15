import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../libs/common/entities/User';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials are invalid');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are invalid');
    }
    return user;
  }

  async login(user: User, response: Response) {
    const TokenPayload = { userId: user.id, role: user.role };

    const accessToken = this.jwtService.sign(TokenPayload, {
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });

    const refreshToken = this.jwtService.sign(TokenPayload, {
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1000,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge:
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
    });
  }

  async refreshTokens(refreshToken: string, response: Response) {
    try {
      const { userId } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new UnauthorizedException();
      }

      await this.login(user, response);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
