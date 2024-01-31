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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Bookshelf } from '../../entities/bookshelf.entity';
import { AuthGuard } from '../../guard/auth.guard';
import { ProgressDto } from './dto/progress.dto';
import { BookshelfService } from './bookshelf.service';
import { BookshelfDto } from './dto/bookshelf.dto';

@ApiTags('bookshelf')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookshelf')
export class BookshelfController {
  constructor(private bookshelfService: BookshelfService) {}

  @Get('/:bookId')
  getBookStatus(
    @Param('bookId') bookId: number,
    @Request() req,
  ): Promise<Bookshelf> {
    return this.bookshelfService.getBookStatus(bookId, req.user.sub);
  }

  @Post('/:bookId')
  addBook(
    @Param('bookId') bookId: number,
    @Body() bookshelfDto: BookshelfDto,
    @Request() req,
  ): Promise<Bookshelf> {
    return this.bookshelfService.addBook(bookId, bookshelfDto, req.user.sub);
  }

  @Post('/:bookId/reading')
  changeReadingStatus(
    @Param('bookId') bookId: number,
    @Body() progressDto: ProgressDto,
    @Request() req,
  ) {
    return this.bookshelfService.changeReadingStatus(
      bookId,
      req.user.sub,
      progressDto,
    );
  }

  @Get()
  getBookshelf(@Request() req) {
    return this.bookshelfService.getBookshelf(req.user.sub);
  }

  @Get('/:bookId/reading')
  getReadingStatus(@Param('bookId') bookId: number, @Request() req) {
    return this.bookshelfService.getReadingStatus(bookId, req.user.sub);
  }

  @Delete('/:bookId')
  deleteBook(
    @Param('bookId') bookId: number,
    @Request() req,
  ): Promise<Bookshelf> {
    return this.bookshelfService.deleteBook(bookId, req.user.sub);
  }
}
