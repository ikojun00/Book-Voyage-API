import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  lastName: string;
}
