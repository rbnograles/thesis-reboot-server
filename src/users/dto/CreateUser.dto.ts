import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  userHealthStatus: string;

  @ApiProperty()
  isVerified: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  userType: string;
}
