import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookshelfDto } from 'src/dto/bookshelf.dto';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { Repository } from 'typeorm';

export class BookshelfService {
  constructor(
    @InjectRepository(Bookshelf)
    private bookshelfRepository: Repository<Bookshelf>,
  ) {}

  async addBook(bookId: number, bookshelfDto: BookshelfDto, userId: number) {
    try {
      const book = await this.bookshelfRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (book) {
        throw new ForbiddenException(
          'You already have this book in the bookshelf',
        );
      }

      return this.bookshelfRepository.save({
        userId,
        bookId,
        ...bookshelfDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(bookId: number, userId: number) {
    try {
      const book = await this.bookshelfRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (!book) {
        throw new ForbiddenException('This book is not in your bookshelf');
      }

      return await this.bookshelfRepository.remove(book);
    } catch (error) {
      throw error;
    }
  }

  async getBookshelf(userId: number) {
    try {
      return this.bookshelfRepository
        .createQueryBuilder('bookshelf')
        .select([
          'bookshelf.shelfId AS shelf',
          'GROUP_CONCAT(bookshelf.bookId) AS bookIds',
        ])
        .where('bookshelf.userId = :userId', { userId })
        .groupBy('bookshelf.shelfId')
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }
}