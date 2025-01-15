import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthorizationService } from '../authorization.service';
import { User } from '../../../../../libs/common/entities/User';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authorizationService: AuthorizationService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<User> {
    return await this.authorizationService.validateUser(email, password);
  }
}
