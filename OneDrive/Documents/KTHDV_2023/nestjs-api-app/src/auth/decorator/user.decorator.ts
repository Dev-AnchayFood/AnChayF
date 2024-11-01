import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (key: string, contex: ExecutionContext) => {
    const request: Express.Request = contex.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
