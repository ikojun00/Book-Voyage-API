import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReadingGoalDto {
  @ApiProperty({
    description: 'A number of books you want to read in the year',
    minimum: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  readingGoal: number;
}
