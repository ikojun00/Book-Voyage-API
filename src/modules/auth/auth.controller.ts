import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guard/auth.guard';
import { signInDto } from 'src/modules/auth/dto/sigin.dto';
import { signUpDto } from 'src/modules/auth/dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: signInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: signUpDto): Promise<signUpDto> {
    return this.authService.signUp(signUpDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
