import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Upvote } from '../../entities/upvote.entity';
import { Reviews } from '../../entities/reviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews]),
    UsersModule,
    TypeOrmModule.forFeature([Upvote]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtService],
})
export class ReviewsModule {}
