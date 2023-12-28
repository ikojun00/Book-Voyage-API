import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Reviews } from './reviews.entity';

@Entity()
export class Upvote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  upvoted: boolean;

  @ManyToOne(() => Reviews, (review) => review.upvote)
  review: Reviews;

  @Column()
  reviewId: number;

  @ManyToOne(() => Users, (user) => user.upvote)
  user: Users;

  @Column()
  userId: number;
}
