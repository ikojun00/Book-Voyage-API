import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewsDto {
  @IsNotEmpty()
  @IsNumber()
  stars: number;

  @IsString()
  comment: string;
}
