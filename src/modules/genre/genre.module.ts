import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksGenre } from '../../entities/booksGenre.entity';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BooksGenre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
