import { User } from 'src/users/schemas/user.schema';

export const userStub = (): User => {
  return {
    mobileNumber: '+619516186637',
    userHealthStatus: 'string',
    isVerified: false,
    createdAt: expect.any(Number),
    userType: 'Member',
  };
};
