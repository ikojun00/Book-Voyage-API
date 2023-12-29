import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @ApiProperty({
    description: 'An email for login',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'A password for login',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
