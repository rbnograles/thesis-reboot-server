import { UserService } from './../services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import mongoose from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    // mock a create account service
    createOneUserAccount: jest.fn(async (dto) => {
      return {
        ...dto,
        createdAt: Date.now(),
        __v: 0,
        _id: new mongoose.Types.ObjectId(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user account', async () => {
    expect(
      await controller.createUser({
        mobileNumber: '+619516186637',
        userHealthStatus: 'string',
        isVerified: false,
        createdAt: Date.now(),
        userType: 'Member',
      }),
    ).toEqual({
      success: true,
      message: 'User is created successfully!',
      body: {
        mobileNumber: '+619516186637',
        userHealthStatus: 'string',
        isVerified: false,
        createdAt: expect.any(Number),
        userType: 'Member',
        _id: expect.any(mongoose.Types.ObjectId),
        __v: expect.any(Number),
      },
    });
  });
});
