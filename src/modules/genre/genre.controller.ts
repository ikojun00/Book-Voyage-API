import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenreService } from './genre.service';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get('/:title')
  getBooksByGenre(@Param('title') title: string) {
    return this.genreService.getBooksByGenre(title);
  }

  @Get('/book/:bookId')
  getGenreByBookID(@Param('bookId') bookId: number) {
    return this.genreService.getGenreByBookId(bookId);
  }
}
