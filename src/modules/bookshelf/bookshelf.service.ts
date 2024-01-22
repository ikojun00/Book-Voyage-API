import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookshelfDto } from 'src/modules/bookshelf/dto/bookshelf.dto';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { Repository } from 'typeorm';

export class BookshelfService {
  constructor(
    @InjectRepository(Bookshelf)
    private bookshelfRepository: Repository<Bookshelf>,
  ) {}

  async getBookStatus(bookId: number, userId: number): Promise<Bookshelf> {
    try {
      return this.bookshelfRepository
        .createQueryBuilder('bookshelf')
        .select('bookshelf.shelfId')
        .where('bookshelf.userId = :userId AND bookshelf.bookId = :bookId', {
          userId,
          bookId,
        })
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async addBook(
    bookId: number,
    bookshelfDto: BookshelfDto,
    userId: number,
  ): Promise<Bookshelf> {
    try {
      if (bookshelfDto.shelfId > 3 || bookshelfDto.shelfId < 1) {
        throw new ForbiddenException('Invalid shelf id');
      }

      const book = await this.bookshelfRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (book) {
        return await this.bookshelfRepository.remove(book);
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

  async deleteBook(bookId: number, userId: number): Promise<Bookshelf> {
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
