import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Mobile number should not be empty' })
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
