import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  validateUser = async (
    mobileNumber: string,
    password: string,
  ): Promise<any> => {
    const user = await this.userService.fetchOneByMobileNumber(mobileNumber);
    // this means that there is a queried data
    if (user.length > 0) {
      // de-construct the data and split out the password
      const { password, ...result } = user[0];

      // compare the password

      return result;
    }
    return null;
  };
}
