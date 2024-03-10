import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviews1703673917567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        bookId INT NOT NULL,
        stars INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        userId INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT unique_book_user_pair UNIQUE (bookId, userId)
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE reviews`);
  }
}
