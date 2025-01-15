import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'libs/common/entities/User';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((response) => {
          if (!response) {
            throw new UnauthorizedException('Invalid authentication');
          }
          this.addUserToRequest(response, context);
        }),
        catchError((error) => {
          console.error('Error during authentication:', error);
          throw new UnauthorizedException('Authentication failed');
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    const authenticationCookie = context.switchToHttp().getRequest()
      .cookies?.Authentication;

    const headers = context.switchToHttp().getRequest().headers;
    const authenticationHeader = headers['authorization'];
    const authentication = authenticationHeader?.split(' ')[1];

    if (!authenticationCookie && !authentication) {
      throw new UnauthorizedException('No authentication token');
    }
    const authenticationToken = authentication ?? authenticationCookie;
    return authenticationToken;
  }

  private addUserToRequest(user: User, context: ExecutionContext) {
    context.switchToHttp().getRequest().user = user;
  }
}
