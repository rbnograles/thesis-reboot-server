import { CreateUserDto } from './dto/CreateUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  // inject user model into service
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create a new user based on the passed parameter
   * @param data : User
   * @returns type of User
   */
  createOneUserAccount = async (data: CreateUserDto): Promise<User> => {
    const mobileNumber = data.mobileNumber;
    const isUserExisting = await this.userRepository.findOne({
      mobileNumber,
    });
    console.log(isUserExisting);
    if (isUserExisting !== null)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    return this.userRepository.create(data);
  };

  /**
   *
   * @returns Array of Objects with typeOf User
   */
  fetchUsers = async (): Promise<Array<User>> => {
    return this.userRepository.find({});
  };

  /**
   *
   * @param id
   * @returns an Object with typeOf User
   */
  fetchOneUser = async (id: string): Promise<User> => {
    try {
      return this.userRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
