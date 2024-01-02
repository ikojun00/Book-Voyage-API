import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookshelfService } from 'src/modules/bookshelf/bookshelf.service';
import { BookshelfController } from 'src/modules/bookshelf/bookshelf.controller';
import { Bookshelf } from 'src/entities/bookshelf.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Bookshelf])],
  controllers: [BookshelfController],
  providers: [BookshelfService, JwtService],
})
export class BookshelfModule {}
