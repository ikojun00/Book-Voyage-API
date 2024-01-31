import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from '../auth/dto/sigin.dto';
import { signUpDto } from '../auth/dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshJwtGuard } from '../../guard/refresh.guard';
import { AuthGuard } from '../../guard/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: signInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: signUpDto): Promise<signUpDto> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<Request> {
    return req.user;
  }
}
