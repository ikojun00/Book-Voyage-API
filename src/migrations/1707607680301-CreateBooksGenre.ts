import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooksGenre1707607680301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS booksGenre (
    id SERIAL PRIMARY KEY,
    bookId INT NOT NULL,
    genreId INT NOT NULL,
    CONSTRAINT fk_genre FOREIGN KEY (genreId) REFERENCES genre(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE booksGenre`);
  }
}
