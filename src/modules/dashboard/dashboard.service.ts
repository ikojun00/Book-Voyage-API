import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from '../../entities/reviews.entity';

export class DashboardService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  async getPopularBooks() {
    try {
      return this.reviewRepository
        .createQueryBuilder('review')
        .select('review.bookId')
        .addSelect('COUNT(review.bookId)', 'review_count')
        .groupBy('review.bookId')
        .orderBy('review_count', 'DESC')
        .limit(5)
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }

  async getLatestBookReviews() {
    try {
      return this.reviewRepository
        .createQueryBuilder('review')
        .select([
          'review.id',
          'review.bookId',
          'review.stars',
          'review.comment',
          'user.firstName',
          'user.lastName',
          'user.profileImageId',
        ])
        .innerJoin('review.user', 'user')
        .orderBy('review.id', 'DESC')
        .limit(4)
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
