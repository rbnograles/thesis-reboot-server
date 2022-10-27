import { UpdateUserDto } from './dto/UpdateUser.dto';
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
    console.log(mobileNumber);
    // check if user is existing
    await this.checkIfUserIsExisting('mobileNumber', mobileNumber);

    return await this.userRepository.create(data);
  };

  /**
   * Get all User Records
   * @returns Array of Objects with typeOf User
   */
  fetchUsers = async (): Promise<Array<User>> => {
    return await this.userRepository.find({});
  };

  /**
   * Get one User record based on the supplier _id
   * @param id
   * @returns an Object with typeOf User
   */
  fetchOneUser = async (_id: string): Promise<User> => {
    return await this.userRepository.findOne({ _id });
  };

  /**
   * Checks if the user is existing or not
   * throws a BAD_REQUEST status if the user exist
   * @param args : string
   * pass any unique identified which belongs to UserSchema
   * @returns boolean
   */
  checkIfUserIsExisting = async (
    key: string,
    args: string,
  ): Promise<boolean> => {
    // construct a dynamic object to cater dynamic field query
    const query = {};
    query[key] = args;

    const result = await this.userRepository.findOne(query);

    if (result !== null)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    return true;
  };

  /**
   * Update fields of User Object
   * @param _id mongoose.Schema.Types.ObjectId
   * @param newUserData : UpdateUserDtp
   * @returns Object of type User
   */
  findOneAndUpdate = async (
    _id: string,
    newUserData: UpdateUserDto,
  ): Promise<User> => {
    return await this.userRepository.findOneAndUpdate({ _id }, newUserData);
  };
}
