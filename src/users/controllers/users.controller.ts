import { CreateUserDto } from './../dto/CreateUser.dto';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { msg: 'Hello World!' };
  }

  @Post('/create')
  createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
    console.log(userData);
    return res.send({
      success: true,
      msg: 'User is created successfully!',
      body: userData,
    });
  }
}
