import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../models';

export const UserReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
