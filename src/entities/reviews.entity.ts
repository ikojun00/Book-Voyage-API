import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
@Unique(['bookId', 'user'])
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  stars: number;

  @Column()
  comment: string;

  @ManyToOne(() => Users, (user) => user.reviews)
  user: Users;

  @Column()
  userId: number;
}
