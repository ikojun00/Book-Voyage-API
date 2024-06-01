import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/popular')
  getPopularBooks() {
    return this.dashboardService.getPopularBooks();
  }

  @Get('/reviews')
  getLatestBookReviews() {
    return this.dashboardService.getLatestBookReviews();
  }
}
