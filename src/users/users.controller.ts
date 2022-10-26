import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  // inject user service to user controller
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    // process the supplied data to the service
    return this.userService.createOneUserAccount(userData);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    // fetch all user regardless of types
    return this.userService.fetchUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    // fetch one user from the id passed as parameter
    const user = this.userService.fetchOneUser(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
