import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginUserDto } from '@app/common/dtos/login-user.dto';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): LoginUserDto => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
