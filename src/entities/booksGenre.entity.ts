import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Genre } from './genre.entity';

@Entity('booksGenre')
export class BooksGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @ManyToOne(() => Genre, (genre) => genre.booksGenres)
  genre: Genre;

  @Column()
  genreId: number;
}
