import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  //path: ../user/me
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    //console.log(request.user);
    return user;
  }
  // me(@Req() request: Request) {
  //   console.log(request.user); //where is it come from ?
  //   return 'user';
  // }
}
