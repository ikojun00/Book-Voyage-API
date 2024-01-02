import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from 'src/modules/reviews/reviews.controller';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsService } from 'src/modules/reviews/reviews.service';
import { UsersModule } from '../users/users.module';
import { Upvote } from 'src/entities/upvote.entity';
import { JwtService } from '@nestjs/jwt';

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
