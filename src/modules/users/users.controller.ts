import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guard/auth.guard';
import { UsersService } from './users.service';
import { ReadingGoalDto } from './dto/readingGoal.dto';
import { UsersDto } from './dto/users.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/readingGoal')
  getReadingGoal(@Request() req) {
    return this.usersService.getReadingGoal(req.user.sub);
  }

  @Patch('/readingGoal')
  changeReadingGoal(@Request() req, @Body() readingGoal: ReadingGoalDto) {
    return this.usersService.changeReadingGoal(req.user.sub, readingGoal);
  }

  @Patch('/profile')
  changeProfile(@Request() req, @Body() usersInfo: UsersDto) {
    return this.usersService.changeProfile(req.user.sub, usersInfo);
  }
}
