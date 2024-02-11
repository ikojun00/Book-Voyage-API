import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BookshelfModule } from './modules/bookshelf/bookshelf.module';
import typeorm from './config/typeorm';
import { GenreModule } from './modules/genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UsersModule,
    ReviewsModule,
    BookshelfModule,
    GenreModule,
  ],
})
export class AppModule {}
