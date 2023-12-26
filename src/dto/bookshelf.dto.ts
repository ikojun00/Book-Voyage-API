import { IsNotEmpty } from 'class-validator';

export class BookshelfDto {
  @IsNotEmpty()
  shelfId: number;
}
