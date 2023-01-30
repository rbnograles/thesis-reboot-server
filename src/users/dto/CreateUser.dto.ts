import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  // mobileNumber
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Mobile number should not be empty' })
  @IsString()
  mobileNumber: string;
  // userHealthStatus
  @ApiProperty({
    default: 'Normal',
    required: false,
  })
  userHealthStatus: string;
  // isVerified
  @ApiProperty({
    default: false,
    required: false,
  })
  @IsBoolean({ message: 'Is verified must be a boolean' })
  isVerified: boolean;
  // createdAt
  @ApiProperty({
    default: Date.now(),
    required: false,
  })
  createdAt: number;
  // userType
  @ApiProperty({
    default: 'Member',
    required: false,
  })
  @IsString()
  userType: string;
  // password
  @ApiProperty({
    required: true,
  })
  @IsString()
  password: string;
}
