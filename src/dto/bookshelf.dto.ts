import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookshelfDto {
  @IsNotEmpty()
  @IsNumber()
  shelfId: number;
}
