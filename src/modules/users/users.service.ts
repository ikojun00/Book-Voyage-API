import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { ReadingGoalDto } from './dto/readingGoal.dto';
import { UsersDto } from './dto/users.dto';
import { ProfileImage } from 'src/entities/profileImage.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(ProfileImage)
    private profileImageRepository: Repository<ProfileImage>,
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getReadingGoal(userId: number) {
    try {
      return this.usersRepository
        .createQueryBuilder('users')
        .select('users.readingGoal')
        .where('users.id = :userId', {
          userId,
        })
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async changeReadingGoal(userId: number, readingGoal: ReadingGoalDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      Object.assign(user, readingGoal);
      await this.usersRepository.save(user);
      return readingGoal;
    } catch (error) {
      throw error;
    }
  }

  async changeProfile(userId: number, usersInfo: UsersDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const email = await this.findOne(usersInfo.email);
      if (email) {
        throw new UnauthorizedException('Email already exists!');
      }

      Object.assign(user, usersInfo);
      await this.usersRepository.save(user);
      return usersInfo;
    } catch (error) {
      throw error;
    }
  }
}
