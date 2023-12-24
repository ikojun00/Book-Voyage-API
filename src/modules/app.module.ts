import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { ReviewsModule } from './reviews.module';
import { Reviews } from 'src/entities/reviews.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users, Reviews],
      ssl: {
        rejectUnauthorized: true,
      },
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
