import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookshelf1703673906589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS bookshelf (
          id INT AUTO_INCREMENT PRIMARY KEY,
          bookId INT NOT NULL,
          shelfId INT NOT NULL,
          userId INT NOT NULL);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE bookshelf`);
  }
}
