import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Mobile number should not be empty' })
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
  @IsBoolean({ message: 'Is verified must be a boolean' })
  isVerified: boolean;

  @ApiProperty({
    default: Date.now(),
    required: false,
  })
  createdAt: string;

  @ApiProperty({
    default: 'Member',
    required: false,
  })
  userType: string;
}
