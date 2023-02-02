import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(mobileNumber: string, password: string): Promise<any> {
    const user = await this.userService.fetchOneByMobileNumber(mobileNumber);
    // this means that there is a queried data
    if (user.length > 0) {
      // compare the password with the salted pass from the database
      const match = await bcrypt.compare(password, user[0].password);
      // if password does not match return null
      if (!match) return null;
      // else return result
      return user[0];
    }
    // if the user is not found
    return null;
  }
}
