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
}
