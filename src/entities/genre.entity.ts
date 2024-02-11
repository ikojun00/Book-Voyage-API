import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BooksGenre } from './booksGenre.entity';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => BooksGenre, (booksGenre) => booksGenre.genre)
  booksGenres: BooksGenre[];
}
