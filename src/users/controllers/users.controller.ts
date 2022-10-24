import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  // inject user service to user controller
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userData: CreateUserDto) {
    // process the supplied data to the service
    const createdUserData = await this.userService.createOneUserAccount(
      userData,
    );

    return {
      success: true,
      message: 'User is created successfully!',
      body: createdUserData,
    };
  }

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
}
