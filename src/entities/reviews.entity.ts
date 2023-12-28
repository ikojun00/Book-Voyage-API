import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { Upvote } from './upvote.entity';

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

  @OneToMany(() => Upvote, (upvote) => upvote.review)
  upvote: Upvote[];
}
