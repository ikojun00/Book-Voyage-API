import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProgress1706045168790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bookshelfId INT NOT NULL,
      percentage INT NOT NULL );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP table progress;
    `);
  }
}
