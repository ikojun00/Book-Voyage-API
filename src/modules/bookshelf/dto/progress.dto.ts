import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProgressDto {
  @ApiProperty({
    description: 'A reading progress',
    minimum: 0,
    maximum: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  completion_percentage: number;
}
