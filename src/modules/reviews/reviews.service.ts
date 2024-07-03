import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from '../../entities/reviews.entity';
import { Upvote } from '../../entities/upvote.entity';
import { ReviewsDto } from './dto/review.dto';

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
          'review.id',
          'review.stars',
          'review.comment',
          'user.firstName',
          'user.lastName',
          'user.profileImageId',
        ])
        .innerJoin('review.user', 'user')
        .where('review.bookId = :bookId', { bookId })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async getAverageRating(bookId: number) {
    try {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .select('AVG(review.stars) as averageRating')
        .where('review.bookId = :bookId', { bookId })
        .getRawOne();
    } catch (error) {
      throw error;
    }
  }

  async getAllLikes(reviewId: number): Promise<number> {
    try {
      return this.upvoteRepository
        .createQueryBuilder('upvote')
        .where('upvote.upvoted = true')
        .innerJoin('upvote.review', 'review')
        .andWhere('review.id = :reviewId', { reviewId })
        .getCount();
    } catch (error) {
      throw error;
    }
  }

  async isReviewPosted(bookId: number, userId: number) {
    try {
      return this.reviewRepository
        .createQueryBuilder('review')
        .select([
          'review.id',
          'review.stars',
          'review.comment',
          'user.firstName',
          'user.lastName',
        ])
        .innerJoin('review.user', 'user')
        .where('review.bookId = :bookId AND user.id = :userId', {
          bookId,
          userId,
        })
        .getOne();
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
      if (reviewDto.stars > 5 || reviewDto.stars < 1) {
        throw new ForbiddenException('Invalid rating');
      }

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
      if (reviewDto.stars > 5 || reviewDto.stars < 1) {
        throw new ForbiddenException('Invalid rating');
      }

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

  async likeReview(reviewId: number, userId: number): Promise<Upvote> {
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
        return await this.upvoteRepository.save(newUpvote);
      } else {
        upvote.upvoted = !upvote.upvoted;
        return await this.upvoteRepository.save(upvote);
      }
    } catch (error) {
      throw error;
    }
  }

  async isReviewLiked(reviewId: number, userId: number): Promise<boolean> {
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
        return false;
      }

      return upvote.upvoted === true ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
