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

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Users, (user) => user.reviews)
  user: Users;

  @Column()
  userId: number;

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvote: Upvote[];
}
