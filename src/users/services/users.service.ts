import { CreateUserDto } from '../dto/CreateUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class UserService {
  // inject user model into service
  constructor(private readonly userRepository: UserRepository) {}

  createOneUserAccount = async (data: CreateUserDto): Promise<User> => {
    const mobileNumber = data.mobileNumber;
    const isUserExisting = await this.userRepository.findOne({
      mobileNumber,
    });
    console.log(isUserExisting);
    if (isUserExisting !== null)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    return await this.userRepository.create(data);
  };

  fetchUsers = async (): Promise<Array<User>> => {
    return await this.userRepository.find({});
  };

  fetchOneUser = async (id: string): Promise<User> => {
    try {
      return await this.userRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
