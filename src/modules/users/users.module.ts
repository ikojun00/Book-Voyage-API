import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { ProfileImage } from 'src/entities/profileImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ProfileImage])],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
