import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserPayload } from '../proto/auth.pb';

export const User = createParamDecorator(
  (_, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
