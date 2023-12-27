import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikes1703676428708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE reviews ADD COLUMN likes INT DEFAULT 0;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE reviews DROP COLUMN likes;`);
  }
}
