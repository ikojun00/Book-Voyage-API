import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { Progress } from './progress.entity';

@Entity()
export class Bookshelf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  shelfId: number;

  @ManyToOne(() => Users, (user) => user.bookshelf)
  user: Users;

  @Column()
  userId: number;
}
