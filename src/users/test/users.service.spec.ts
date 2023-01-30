import { HttpException } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from './stubs/user.stub';
import { UpdateUserDto } from '../dto/UpdateUser.dto';

jest.mock('../users.service.ts');

describe('UserService', () => {
  let service: UsersService;
  let filterQuery: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    filterQuery = new mongoose.Types.ObjectId().toString();
    // clear mocks after every execution
    jest.clearAllMocks();
  });

  /**
   * Default Testing if the controller is defined
   */
  describe('variables must be defined', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
    it('filterQuery should be defined', () => {
      expect(filterQuery).toBeDefined();
    });
  });
});
