import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    description: 'An access token',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'An refresh token',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty({
    description: 'Token expiration time',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  expiresIn: number;
}
