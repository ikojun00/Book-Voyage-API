import {
  Body,
  Get,
  Request,
  Controller,
  Post,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { Reviews } from '../../entities/reviews.entity';
import { Upvote } from '../../entities/upvote.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { ReviewsDto } from './dto/review.dto';

@ApiTags('reviews')
@Controller('review/:bookId')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  getAllBookReviews(@Param('bookId') bookId: number) {
    return this.reviewService.getAllBookReviews(bookId);
  }

  @Get('/averageRating')
  getAverageRating(@Param('bookId') bookId: number) {
    return this.reviewService.getAverageRating(bookId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/user')
  isReviewPosted(@Param('bookId') bookId: number, @Request() req) {
    return this.reviewService.isReviewPosted(bookId, req.user.sub);
  }

  @Get('/:reviewId')
  getAllLikes(@Param('reviewId') reviewId: number): Promise<number> {
    return this.reviewService.getAllLikes(reviewId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  postReview(
    @Param('bookId') bookId: number,
    @Body() review: ReviewsDto,
    @Request() req,
  ): Promise<Reviews> {
    return this.reviewService.postReview(bookId, review, req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  deleteReview(
    @Param('bookId') bookId: number,
    @Request() req,
  ): Promise<Reviews> {
    return this.reviewService.deleteReview(bookId, req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  modifyReview(
    @Param('bookId') bookId: number,
    @Body() review: ReviewsDto,
    @Request() req,
  ): Promise<Reviews> {
    return this.reviewService.modifyReview(bookId, review, req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/upvote/:reviewId')
  likeReview(
    @Param('reviewId') reviewId: number,
    @Request() req,
  ): Promise<Upvote> {
    return this.reviewService.likeReview(reviewId, req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/upvote/:reviewId')
  isReviewLiked(
    @Param('reviewId') reviewId: number,
    @Request() req,
  ): Promise<boolean> {
    return this.reviewService.isReviewLiked(reviewId, req.user.sub);
  }
}
