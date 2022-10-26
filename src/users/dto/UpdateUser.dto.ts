import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  mobileNumber: string;

  @ApiProperty({
    default: 'Normal',
    required: false,
  })
  userHealthStatus: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  userType: string;
}
