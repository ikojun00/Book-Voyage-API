import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PayloadDto {
  @ApiProperty({
    description: 'User ID',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  sub: number;

  @ApiProperty({
    description: 'An email',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'A firstname',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'A lastname',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'A profile image id',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  profileImageId: number;
}
