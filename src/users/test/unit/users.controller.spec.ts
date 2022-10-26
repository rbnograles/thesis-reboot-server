import mongoose from 'mongoose';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { User } from '../../schemas/user.schema';
import { UsersService } from '../../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { userStub } from '../stubs/user.stub';
import { UpdateUserDto } from '../../dto/UpdateUser.dto';

jest.mock('../../users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let filterQuery: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    filterQuery = new mongoose.Types.ObjectId().toString();
    // clear mocks after every execution
    jest.clearAllMocks();
  });

  /**
   * Default Testing if the controller is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Testing for creating a user
   */
  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          mobileNumber: userStub().mobileNumber,
          userHealthStatus: userStub().userHealthStatus,
          userType: userStub().userType,
          isVerified: userStub().isVerified,
          createdAt: userStub().createdAt,
        };
        user = await controller.createUser(createUserDto);
      });

      test('then it should call userService => createOneUserAccount', async () => {
        expect(await service.createOneUserAccount).toHaveBeenCalledWith(
          createUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  /**
   * Testing for get many users
   */
  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.getUsers();
      });

      test('then it should call the userService => fetchUsers', async () => {
        expect(await service.fetchUsers).toHaveBeenLastCalledWith();
      });

      test('then it should return a user', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  /**
   * Testing for get one user
   */
  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await controller.getOneUser(filterQuery);
      });

      test('then it should call the userService => fetchOneUser', async () => {
        expect(await service.fetchOneUser).toHaveBeenLastCalledWith(
          filterQuery,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  /**
   * Testing for updating a single user
   */
  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let updateUserDto: UpdateUserDto;
      let user: User;

      beforeEach(async () => {
        updateUserDto = {
          mobileNumber: userStub().mobileNumber,
          userHealthStatus: userStub().userHealthStatus,
          userType: userStub().userType,
          isVerified: userStub().isVerified,
        };

        user = await controller.updateUser(filterQuery, updateUserDto);
      });

      test('then it should call the userService => findOneAndUpdate', async () => {
        expect(await service.findOneAndUpdate).toHaveBeenCalledWith(
          filterQuery,
          updateUserDto,
        );
      });

      test('then it should return the updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
