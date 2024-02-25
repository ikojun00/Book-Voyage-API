import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookshelf } from '../../entities/bookshelf.entity';
import { Repository } from 'typeorm';
import { Progress } from '../../entities/progress.entity';
import { ProgressDto } from './dto/progress.dto';
import { BookshelfDto } from './dto/bookshelf.dto';

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

  async updateBook(
    book: Bookshelf,
    bookshelfDto: BookshelfDto,
  ): Promise<Bookshelf> {
    const reading = await this.progressRepository.findOne({
      where: {
        bookshelfId: book.id,
      },
    });
    // reading progress needs to exist on currently reading
    if (!reading && bookshelfDto.shelfId === 1)
      await this.progressRepository.save({
        bookshelfId: book.id,
        percentage: 0,
      });
    // reading progress needs to be removed when book is not being currently read
    else if (reading && bookshelfDto.shelfId !== 1)
      await this.progressRepository.remove(reading);

    Object.assign(book, bookshelfDto);
    return this.bookshelfRepository.save(book);
  }

  async addBook(
    bookId: number,
    bookshelfDto: BookshelfDto,
    userId: number,
  ): Promise<Bookshelf> {
    try {
      if (bookshelfDto.shelfId > 3 || bookshelfDto.shelfId < 1) {
        throw new ForbiddenException('Invalid shelf id!');
      }

      const book = await this.bookshelfRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (book) {
        return await this.updateBook(book, bookshelfDto);
      } else {
        if (bookshelfDto.shelfId === 1) {
          const bookshelfReport = await this.bookshelfRepository.save({
            userId,
            bookId,
            ...bookshelfDto,
          });
          await this.progressRepository.save({
            bookshelfId: bookshelfReport.bookId,
            percentage: 0,
          });
          return bookshelfReport;
        }

        return this.bookshelfRepository.save({
          userId,
          bookId,
          ...bookshelfDto,
        });
      }
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
        throw new ForbiddenException('This book is not in your bookshelf!');
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
  ): Promise<Progress> {
    const book = await this.bookshelfRepository.findOne({
      where: {
        bookId,
        userId,
      },
    });

    if (!book || book.shelfId !== 1) {
      throw new ForbiddenException('Cannot change reading status!');
    }

    const reading = await this.progressRepository.findOne({
      where: {
        bookshelfId: book.id,
      },
    });

    if (!reading) {
      throw new NotFoundException('Reading status not found!');
    }

    if (progressDto.percentage < 0 || progressDto.percentage > 100) {
      throw new ForbiddenException('Setting invalid number!');
    }

    Object.assign(reading, progressDto);
    return await this.progressRepository.save(reading);
  }

  async getBookshelf(userId: number) {
    try {
      return this.bookshelfRepository
        .createQueryBuilder('bookshelf')
        .select([
          'bookshelf.shelfId AS shelf',
          'JSON_ARRAYAGG(bookshelf.bookId) AS bookIds',
        ])
        .where('bookshelf.userId = :userId', { userId })
        .groupBy('bookshelf.shelfId')
        .getRawMany();
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
