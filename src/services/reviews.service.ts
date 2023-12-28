import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsDto } from 'src/dto/review.dto';
import { Upvote } from 'src/entities/upvote.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
    @InjectRepository(Upvote)
    private upvoteRepository: Repository<Upvote>,
  ) {}

  async getAllBookReviews(bookId: number) {
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

  async modifyReview(
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

      if (!review) {
        throw new NotFoundException('Review not found');
      }
      Object.assign(review, reviewDto);
      return this.reviewRepository.save(review);
    } catch (error) {
      throw error;
    }
  }

  async likeReview(reviewId: number, userId: number): Promise<Reviews> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          id: reviewId,
        },
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      const upvote = await this.upvoteRepository.findOne({
        where: {
          reviewId,
          userId,
        },
      });

      if (!upvote) {
        const newUpvote = this.upvoteRepository.create({
          reviewId,
          userId,
        });
        await this.upvoteRepository.save(newUpvote);
        review.likes = (review.likes || 0) + 1;
      } else {
        upvote.upvoted = !upvote.upvoted;
        await this.upvoteRepository.save(upvote);

        review.likes = upvote.upvoted
          ? (review.likes || 0) + 1
          : (review.likes || 0) - 1;
      }

      return await this.reviewRepository.save(review);
    } catch (error) {
      throw error;
    }
  }
}
