import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  createOneUserAccount: jest.fn().mockResolvedValue(userStub()),
  fetchUsers: jest.fn().mockResolvedValue([userStub()]),
  fetchOneUser: jest.fn().mockResolvedValue(userStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(userStub()),
});
