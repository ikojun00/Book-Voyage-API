import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookshelf } from '../../entities/bookshelf.entity';
import { JwtService } from '@nestjs/jwt';
import { Progress } from '../../entities/progress.entity';
import { BookshelfController } from './bookshelf.controller';
import { BookshelfService } from './bookshelf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookshelf]),
    TypeOrmModule.forFeature([Progress]),
  ],
  controllers: [BookshelfController],
  providers: [BookshelfService, JwtService],
})
export class BookshelfModule {}
