import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all user regardless of their user types', () => {
    expect(controller.getUsers()).toEqual([]);
  });
});
