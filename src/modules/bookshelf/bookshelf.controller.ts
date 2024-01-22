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
import { BookshelfDto } from 'src/modules/bookshelf/dto/bookshelf.dto';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { BookshelfService } from 'src/modules/bookshelf/bookshelf.service';

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
