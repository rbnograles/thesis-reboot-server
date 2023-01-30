import mongoose from 'mongoose';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from './stubs/user.stub';
import { UpdateUserDto } from '../dto/UpdateUser.dto';

jest.mock('../users.service.ts');

describe('UserService', () => {
  let service: UsersService;
  let filterQuery: string;
  let createUserDTO: CreateUserDto;
  let updateUserDTO: UpdateUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    filterQuery = new mongoose.Types.ObjectId().toString();
    // clear mocks after every execution

    updateUserDTO = {
      mobileNumber: userStub().mobileNumber,
      userHealthStatus: userStub().userHealthStatus,
      userType: userStub().userType,
      isVerified: userStub().isVerified,
      password: userStub().password,
    };

    createUserDTO = {
      mobileNumber: userStub().mobileNumber,
      userHealthStatus: userStub().userHealthStatus,
      userType: userStub().userType,
      isVerified: userStub().isVerified,
      createdAt: userStub().createdAt,
      password: userStub().password,
    };

    jest.clearAllMocks();
  });

  /**
   * Default Testing if the controller is defined
   */
  describe('variables must be defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('filterQuery should be defined', () => {
      expect(filterQuery).toBeDefined();
    });
  });

  describe('when createOneUserAccount is called', () => {
    test('should call createOneUserAccount method with expected params', async () => {
      const createOneUserAccountSpy = jest.spyOn(
        service,
        'createOneUserAccount',
      );
      const dto = createUserDTO;
      service.createOneUserAccount(dto);
      expect(createOneUserAccountSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe('when fetchUsers is called', () => {
    test('should call fetchUsers method with no parameter', async () => {
      const fetchUsersSpy = jest.spyOn(service, 'fetchUsers');
      service.fetchUsers();
      expect(fetchUsersSpy).toHaveBeenCalled();
    });
  });

  describe('when fetchOneUser is called', () => {
    test('should call fetchOneUser method with _id as parameter', async () => {
      const fetchOneUsersSpy = jest.spyOn(service, 'fetchOneUser');
      service.fetchOneUser(filterQuery);
      expect(fetchOneUsersSpy).toHaveBeenCalledWith(filterQuery);
    });
  });

  describe('when fetchOneByMobileNumber is called', () => {
    test('should call fetchOneByMobileNumber method with mobileNumber as parameter', async () => {
      const fetchUsersByMobileNumberSpy = jest.spyOn(
        service,
        'fetchOneByMobileNumber',
      );
      const mobileNumber = userStub().mobileNumber;
      service.fetchOneByMobileNumber(mobileNumber);
      expect(fetchUsersByMobileNumberSpy).toHaveBeenCalledWith(mobileNumber);
    });
  });

  describe('when checkIfUserIsExisting is called', () => {
    test('should call checkIfUserIsExisting method with key and args as parameter', async () => {
      const checkIfUserIsExistingSpy = jest.spyOn(
        service,
        'checkIfUserIsExisting',
      );
      const mobileNumber = userStub().mobileNumber;
      service.checkIfUserIsExisting('mobileNumber', mobileNumber);
      expect(checkIfUserIsExistingSpy).toHaveBeenCalledWith(
        'mobileNumber',
        mobileNumber,
      );
    });
  });

  describe('when findOneAndUpdate is called', () => {
    test('should call findOneAndUpdate method with expected params', async () => {
      const findOneAndUpdateSpy = jest.spyOn(service, 'findOneAndUpdate');
      const dto = updateUserDTO;
      service.findOneAndUpdate(filterQuery, dto);
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith(filterQuery, dto);
    });
  });
});
