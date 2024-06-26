import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Reviews } from './reviews.entity';
import { Bookshelf } from './bookshelf.entity';
import { Upvote } from './upvote.entity';
import { ProfileImage } from './profileImage.entity';

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

  @Column()
  readingGoal: number;

  @Column()
  profileImageId: number;

  @OneToMany(() => Bookshelf, (bookshelf) => bookshelf.user)
  bookshelf: Bookshelf[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvote: Upvote[];

  @ManyToOne(() => ProfileImage, (profileImage) => profileImage.user)
  profileImage: ProfileImage;
}
