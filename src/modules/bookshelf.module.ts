import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookshelfService } from 'src/services/bookshelf.service';
import { BookshelfController } from 'src/controllers/bookshelf.controller';
import { Bookshelf } from 'src/entities/bookshelf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookshelf])],
  controllers: [BookshelfController],
  providers: [BookshelfService],
})
export class BookshelfModule {}
