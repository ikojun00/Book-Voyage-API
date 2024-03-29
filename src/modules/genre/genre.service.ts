import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksGenre } from '../../entities/booksGenre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(BooksGenre)
    private booksGenreRepository: Repository<BooksGenre>,
  ) {}

  async getGenreByBookId(bookId: number) {
    try {
      return this.booksGenreRepository
        .createQueryBuilder('booksGenre')
        .select(['booksGenre.bookId', 'genre.title'])
        .innerJoin('booksGenre.genre', 'genre')
        .where('booksGenre.bookId = :bookId', { bookId })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async getBooksByGenre(title: string) {
    try {
      const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
      return this.booksGenreRepository
        .createQueryBuilder('booksGenre')
        .select(['booksGenre.bookId', 'genre.title'])
        .innerJoin('booksGenre.genre', 'genre')
        .where('genre.title = :title', { title: capitalizedTitle })
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
