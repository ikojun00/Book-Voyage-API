import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Bookshelf } from './bookshelf.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Bookshelf)
  @JoinColumn()
  bookshelf: Bookshelf;

  @Column()
  bookshelfId: number;

  @Column()
  percentage: number;
}
