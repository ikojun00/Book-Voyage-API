import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signInDto } from 'src/dto/sigin.dto';
import { signUpDto } from 'src/dto/signup.dto';
import { Users } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: signInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isMatch = await bcrypt.compare(signInDto.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
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
