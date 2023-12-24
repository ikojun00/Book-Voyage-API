import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from 'src/controllers/review.controller';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsService } from 'src/services/reviews.service';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews]), UsersModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
