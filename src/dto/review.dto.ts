import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewsDto {
  @IsNotEmpty()
  stars: number;

  @IsString()
  comment: string;
}
