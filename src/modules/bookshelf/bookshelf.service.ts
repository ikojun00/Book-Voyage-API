import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookshelfDto } from 'src/modules/bookshelf/dto/bookshelf.dto';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { Repository } from 'typeorm';
import { Progress } from 'src/entities/progress.entity';
import { ProgressDto } from './dto/progress.dto';

export class BookshelfService {
  constructor(
    @InjectRepository(Bookshelf)
    private bookshelfRepository: Repository<Bookshelf>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
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
        const reading = await this.progressRepository.findOne({
          where: {
            bookshelfId: book.id,
          },
        });
        if (!reading && bookshelfDto.shelfId === 1)
          await this.progressRepository.save({
            bookshelfId: book.id,
            percentage: 0,
          });
        else if (reading && bookshelfDto.shelfId !== 1)
          await this.progressRepository.remove(reading);

        Object.assign(book, bookshelfDto);
        return this.bookshelfRepository.save(book);
      }

      if (bookshelfDto.shelfId === 1) {
        await this.progressRepository.save({
          bookshelfId: book.id,
          percentage: 0,
        });
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

      if (book.shelfId === 1) {
        const reading = await this.progressRepository.findOne({
          where: {
            bookshelfId: book.id,
          },
        });
        if (reading) await this.progressRepository.remove(reading);
      }

      return await this.bookshelfRepository.remove(book);
    } catch (error) {
      throw error;
    }
  }

  async changeReadingStatus(
    bookId: number,
    userId: number,
    progressDto: ProgressDto,
  ) {
    const book = await this.bookshelfRepository.findOne({
      where: {
        bookId,
        userId,
      },
    });

    if (!book || book.shelfId !== 1) {
      throw new ForbiddenException('Cannot change reading status');
    }

    const reading = await this.progressRepository.findOne({
      where: {
        bookshelfId: book.id,
      },
    });

    if (!reading) {
      throw new NotFoundException('Reading status not found');
    }
    Object.assign(reading, progressDto);
    return await this.progressRepository.save(reading);
  }

  async getBookshelf(userId: number) {
    try {
      const bookshelf = this.bookshelfRepository
        .createQueryBuilder('bookshelf')
        .select([
          'bookshelf.shelfId AS shelf',
          'JSON_ARRAYAGG(bookshelf.bookId) AS bookIds',
        ])
        .where('bookshelf.userId = :userId', { userId })
        .groupBy('bookshelf.shelfId')
        .getRawMany();
      const reading = (await bookshelf).map((item) => {
        if (item.shelf === 1) {
          item;
        }
      });
      return (await bookshelf).concat(reading);
    } catch (error) {
      throw error;
    }
  }

  async getReadingStatus(bookId: number, userId: number) {
    try {
      return this.progressRepository
        .createQueryBuilder('progress')
        .select(['bookshelf.bookId', 'bookshelf.userId', 'progress.percentage'])
        .innerJoin('progress.bookshelf', 'bookshelf')
        .where('bookshelf.bookId = :bookId AND bookshelf.userId = :userId', {
          bookId,
          userId,
        })
        .getOne();
    } catch (error) {
      throw error;
    }
  }
}
