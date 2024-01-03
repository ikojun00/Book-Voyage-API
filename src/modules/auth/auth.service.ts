import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signInDto } from 'src/modules/auth/dto/sigin.dto';
import { signUpDto } from 'src/modules/auth/dto/signup.dto';
import { Users } from 'src/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './config/constants';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInDto: signInDto) {
    const user = await this.usersService.findOne(signInDto.email);
    const isMatch = await bcrypt.compare(signInDto.password, user?.password);
    if (!user || !isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    return {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
    };
  }

  async refreshToken(user) {
    const payload = {
      sub: user.sub,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: jwtConstants.secret,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: jwtConstants.secretRefreshToken,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async signIn(signInDto: signInDto): Promise<any> {
    const payload = await this.validateUser(signInDto);
    return {
      user: { ...payload },
      backendTokens: {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: jwtConstants.secret,
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
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
      throw new UnauthorizedException('Email already exists');
    }
    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
    return this.usersRepository.save(signUpDto);
  }
}
