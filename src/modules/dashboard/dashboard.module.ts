import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Reviews } from 'src/entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
