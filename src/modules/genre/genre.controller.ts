import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { GenreDto } from './dto/genre.dto';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  getBooksByGenre(@Body() genre: GenreDto) {
    return this.genreService.getBooksByGenre(genre.title);
  }

  @Get('/:bookId')
  getGenreByBookID(@Param('bookId') bookId: number) {
    return this.genreService.getGenreByBookId(bookId);
  }
}
