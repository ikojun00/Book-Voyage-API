import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

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
