import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Mobile number should not be empty' })
  @IsString({ message: 'Mobile number should be a string' })
  mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User health status should not be empty' })
  @IsString({ message: 'User health status should be a string' })
  userHealthStatus: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Is verified should not be empty' })
  @IsBoolean({ message: 'Is verified must be a boolean' })
  isVerified: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'User type should not be empty' })
  @IsString({ message: 'User type should be a string' })
  userType: string;
}
