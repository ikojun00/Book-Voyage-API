import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProgress1706045168790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      bookshelfId INT NOT NULL,
      CONSTRAINT fk_bookshelf FOREIGN KEY (bookshelfId) REFERENCES bookshelf(id),
      completion_percentage INT NOT NULL
  )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP table progress;
    `);
  }
}
