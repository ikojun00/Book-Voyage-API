import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity('profileImage')
export class ProfileImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  image: Buffer;

  @OneToMany(() => Users, (user) => user.profileImage)
  user: Users[];
}
