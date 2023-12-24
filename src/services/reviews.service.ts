import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsDto } from 'src/dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  async getAllBookReviews(bookId: number): Promise<any> {
    try {
      return this.reviewRepository
        .createQueryBuilder('review')
        .select([
          'review.stars',
          'review.comment',
          'user.firstName',
          'user.lastName',
        ])
        .innerJoin('review.user', 'user')
        .where('review.bookId = :bookId', { bookId })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async postReview(
    bookId: number,
    reviewDto: ReviewsDto,
    userId: number,
  ): Promise<Reviews> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (review) {
        throw new ForbiddenException('You already have review');
      }

      return this.reviewRepository.save({
        userId,
        bookId,
        ...reviewDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(bookId: number, userId: number): Promise<Reviews> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      return await this.reviewRepository.remove(review);
    } catch (error) {
      throw error;
    }
  }

  async modifyReview(bookId: number, reviewDto: ReviewsDto, userId: number) {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          bookId,
          userId,
        },
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }
      Object.assign(review, reviewDto);
      return this.reviewRepository.save(review);
    } catch (error) {
      throw error;
    }
  }
}
