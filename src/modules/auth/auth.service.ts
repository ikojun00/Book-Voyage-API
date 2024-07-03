import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signInDto } from '../auth/dto/sigin.dto';
import { signUpDto } from '../auth/dto/signup.dto';
import { Users } from '../../entities/users.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './config/constants';
import { TokenDto } from './dto/token.dto';
import { PayloadDto } from './dto/payload.dto';
import { ValidationDto } from './dto/validation.dto';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInDto: signInDto): Promise<PayloadDto> {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }
    const isMatch = await bcrypt.compare(signInDto.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials!');
    }
    return {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageId: user.profileImageId,
    };
  }

  async refreshToken(user: PayloadDto): Promise<TokenDto> {
    const payload = {
      sub: user.sub,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: jwtConstants.secret,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: jwtConstants.secretRefreshToken,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async signIn(signInDto: signInDto): Promise<ValidationDto> {
    const payload = await this.validateUser(signInDto);
    return {
      user: { ...payload },
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: jwtConstants.secret,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: jwtConstants.secretRefreshToken,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async signUp(signUpDto: signUpDto): Promise<signUpDto> {
    const user = await this.usersService.findOne(signUpDto.email);
    if (user) {
      throw new UnauthorizedException('Email already exists!');
    }
    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
    return this.usersRepository.save(signUpDto);
  }
}
