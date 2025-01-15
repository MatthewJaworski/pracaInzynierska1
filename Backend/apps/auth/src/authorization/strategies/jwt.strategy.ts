import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../../../../libs/common/entities/User';
import { UserService } from '../../users/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ userId }: { userId: string }): Promise<User> {
    try {
      return await this.userService.getUserById(userId);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
