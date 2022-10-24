import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  // inject user service to user controller
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    // fetch all user regardless of types
    return await this.userService.fetchUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    // fetch one user from the id passed as parameter
    const user = await this.userService.fetchOneUser(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Post('/create')
  async createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
    // process the supplied data to the service
    const createdUserData = await this.userService.createOneUserAccount(
      userData,
    );

    return res.send({
      success: true,
      message: 'User is created successfully!',
      body: createdUserData,
    });
  }
}
