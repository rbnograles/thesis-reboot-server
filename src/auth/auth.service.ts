import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  //   async validateUser(mobileNumber: string, password: string): Promise<any> {
  //     const user = await this.userService.fetchOneByMobileNumber(mobileNumber);
  //   }
}
