import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileImage1719413893532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "profileImage" (
                id SERIAL PRIMARY KEY,
                image BYTEA
                );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profileImage"`);
  }
}
