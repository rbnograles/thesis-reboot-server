import { UserDocument } from '../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../users.repository';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './support/user.model';
import mongoose from 'mongoose';

describe('UsersRepository', () => {
  let repository: UserRepository;
  let model: UserModel;
  const query = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    model = module.get<UserModel>(getModelToken(User.name));
    query['_id'] = new mongoose.Types.ObjectId().toString();
    // clear all mocks after execution
    jest.clearAllMocks();
  });

  describe('providers must be defined', () => {
    it('repository should be defined', () => {
      expect(repository).toBeDefined();
    });
    it('model should be defined', () => {
      expect(model).toBeDefined();
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: UserDocument | null;

      beforeEach(async () => {
        // set up spy for  userModel
        jest.spyOn(model, 'findOne');
        user = await repository.findOne(query);
      });

      test('then it should call the userModel => findOne', () => {
        expect(model.findOne).toHaveBeenCalledWith(query, {});
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('find', () => {
    describe('when find is called', () => {
      let users: UserDocument[] | null;

      beforeEach(async () => {
        // set up spy for  userModel
        jest.spyOn(model, 'find');
        users = await repository.find({});
      });

      test('then it should call the userModel => find', () => {
        expect(model.find).toHaveBeenCalledWith({});
      });

      test('then it should return all users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;

      beforeEach(async () => {
        // set up spy for  userModel
        saveSpy = jest.spyOn(UserModel.prototype, 'create');
        user = await repository.create(userStub());
      });

      test('then it should call the userModel => save', () => {
        expect(saveSpy).toHaveBeenCalledWith(userStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
