import { User } from 'src/users/schemas/user.schema';

export const userStub = (): User => {
  return {
    mobileNumber: '+619516186637',
    userHealthStatus: 'string',
    isVerified: false,
    createdAt: 1666831602192,
    userType: 'Member',
  };
};
