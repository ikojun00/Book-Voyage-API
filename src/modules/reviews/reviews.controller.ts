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
import { ReviewsService } from 'src/modules/reviews/reviews.service';
import { ReviewsDto } from 'src/modules/reviews/dto/review.dto';
import { Reviews } from 'src/entities/reviews.entity';
import { Upvote } from 'src/entities/upvote.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('review/:bookId')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  getAllBookReviews(@Param('bookId') bookId: number) {
    return this.reviewService.getAllBookReviews(bookId);
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
  @Patch('upvote/:reviewId')
  likeReview(
    @Param('reviewId') reviewId: number,
    @Request() req,
  ): Promise<Upvote> {
    return this.reviewService.likeReview(reviewId, req.user.sub);
  }
}
