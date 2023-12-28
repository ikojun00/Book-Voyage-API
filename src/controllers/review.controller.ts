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
import { AuthGuard } from '../guard/auth.guard';
import { ReviewsService } from 'src/services/reviews.service';
import { ReviewsDto } from 'src/dto/review.dto';

@Controller('review/:bookId')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  getAllBookReviews(@Param('bookId') bookId: number) {
    return this.reviewService.getAllBookReviews(bookId);
  }

  @Get('/:reviewId')
  getAllLikes(@Param('reviewId') reviewId: number) {
    return this.reviewService.getAllLikes(reviewId);
  }

  @UseGuards(AuthGuard)
  @Post()
  postReview(
    @Param('bookId') bookId: number,
    @Body() review: ReviewsDto,
    @Request() req,
  ) {
    return this.reviewService.postReview(bookId, review, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteReview(@Param('bookId') bookId: number, @Request() req) {
    return this.reviewService.deleteReview(bookId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch()
  modifyReview(
    @Param('bookId') bookId: number,
    @Body() review: ReviewsDto,
    @Request() req,
  ) {
    return this.reviewService.modifyReview(bookId, review, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('upvote/:reviewId')
  likeReview(@Param('reviewId') reviewId: number, @Request() req) {
    return this.reviewService.likeReview(reviewId, req.user.sub);
  }
}
