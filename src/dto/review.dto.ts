import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewsDto {
  @ApiProperty({
    description: 'A rating for the review',
    minimum: 1,
    maximum: 5,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stars: number;

  @ApiProperty({
    description: 'A comment for the review',
    type: String,
    required: false,
  })
  @IsString()
  comment: string;
}
