import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
