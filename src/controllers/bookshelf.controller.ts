import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookshelfDto } from 'src/dto/bookshelf.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { BookshelfService } from 'src/services/bookshelf.service';

@Controller('bookshelf')
export class BookshelfController {
  constructor(private bookshelfService: BookshelfService) {}

  @UseGuards(AuthGuard)
  @Post('/:bookId')
  addBook(
    @Param('bookId') bookId: number,
    @Body() bookshelfDto: BookshelfDto,
    @Request() req,
  ) {
    return this.bookshelfService.addBook(bookId, bookshelfDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  getBookshelf(@Request() req) {
    return this.bookshelfService.getBookshelf(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete('/:bookId')
  deleteBook(@Param('bookId') bookId: number, @Request() req) {
    return this.bookshelfService.deleteBook(bookId, req.user.sub);
  }
}
