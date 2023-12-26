import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Reviews } from './reviews.entity';
import { Bookshelf } from './bookshelf.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @OneToMany(() => Bookshelf, (bookshelf) => bookshelf.user)
  bookshelf: Bookshelf[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];
}
