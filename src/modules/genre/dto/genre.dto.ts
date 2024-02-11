import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenreDto {
  @ApiProperty({
    description: 'A name of genre',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
