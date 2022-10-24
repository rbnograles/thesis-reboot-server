import { CreateUserDto } from '../dto/CreateUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  // inject user model into service
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createOneUserAccount = async (data: CreateUserDto): Promise<User> => {
    const isUserExisting = await this.userModel.findOne({
      mobileNumber: data.mobileNumber,
    });
    console.log(isUserExisting);
    if (isUserExisting !== null)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    return await this.userModel.create(data);
  };

  fetchUsers = async (): Promise<Array<User>> => {
    return await this.userModel.find().sort({ createdAt: 1 });
  };

  fetchOneUser = async (id: string): Promise<User> => {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
