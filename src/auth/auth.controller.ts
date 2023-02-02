import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly localStrategy: LocalStrategy) {}

  // login
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const res = await this.localStrategy.validate(
      req.body.mobileNumber,
      req.body.password,
    );
    return res;
  }
}
