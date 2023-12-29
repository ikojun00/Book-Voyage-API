import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class signUpDto {
  @ApiProperty({
    description: 'An email for signup',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description:
      'A password for signup (requirements: one lowercase letter, one uppercase letter, one digit and one special character)',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'A firstname for signup',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'A lastname for signup',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
