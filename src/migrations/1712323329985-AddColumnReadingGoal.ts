import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnReadingGoal1712323329985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users
    ADD COLUMN "readingGoal" INT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users
    DROP COLUMN "readingGoal";`);
  }
}
