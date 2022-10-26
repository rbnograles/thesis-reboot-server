import { CreateUserDto } from './../dto/CreateUser.dto';
import { User } from './../schemas/user.schema';
import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

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

      test('then it should call userService', async () => {
        expect(await service.createOneUserAccount).toHaveBeenCalledWith(
          createUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.getUsers();
      });

      test('then it should call the userService', async () => {
        expect(await service.fetchUsers).toHaveBeenLastCalledWith();
      });

      test('then it should return a user', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
});
