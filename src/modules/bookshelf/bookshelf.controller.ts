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
import { ApiBearerAuth } from '@nestjs/swagger';
import { BookshelfDto } from 'src/modules/bookshelf/dto/bookshelf.dto';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { BookshelfService } from 'src/modules/bookshelf/bookshelf.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookshelf')
export class BookshelfController {
  constructor(private bookshelfService: BookshelfService) {}

  @Post('/:bookId')
  addBook(
    @Param('bookId') bookId: number,
    @Body() bookshelfDto: BookshelfDto,
    @Request() req,
  ): Promise<Bookshelf> {
    return this.bookshelfService.addBook(bookId, bookshelfDto, req.user.sub);
  }

  @Get()
  getBookshelf(@Request() req) {
    return this.bookshelfService.getBookshelf(req.user.sub);
  }

  @Delete('/:bookId')
  deleteBook(
    @Param('bookId') bookId: number,
    @Request() req,
  ): Promise<Bookshelf> {
    return this.bookshelfService.deleteBook(bookId, req.user.sub);
  }
}
