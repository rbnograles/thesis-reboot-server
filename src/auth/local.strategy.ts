import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'mobileNumber',
    });
  }

  async validate(mobileNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(mobileNumber, password);
    // if the credentials are not valid
    if (!user) {
      throw new UnauthorizedException();
    }
    // else return the user data
    return user;
  }
}
