import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  mobileNumber: string;

  @ApiProperty({
    default: 'Normal',
    required: false,
  })
  userHealthStatus: string;

  @ApiProperty({
    default: false,
    required: false,
  })
  isVerified: boolean;

  @ApiProperty({
    default: Date.now(),
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    default: 'Member',
    required: false,
  })
  userType: string;
}
