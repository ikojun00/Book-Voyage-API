import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PayloadDto } from './payload.dto';
import { TokenDto } from './token.dto';

export class ValidationDto {
  @ApiProperty({
    description: 'An user',
  })
  @IsNotEmpty()
  user: PayloadDto;

  @ApiProperty({
    description: 'Backend tokens',
  })
  @IsNotEmpty()
  backendTokens: TokenDto;
}
