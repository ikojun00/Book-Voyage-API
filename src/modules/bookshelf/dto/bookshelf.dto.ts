import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookshelfDto {
  @ApiProperty({
    description:
      'A shelf of the bookshelf (1 - currently reading, 2 - read, 3 - want to read)',
    minimum: 1,
    maximum: 3,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  shelfId: number;
}
