import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnProfileImage1719414067190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users
      ADD COLUMN "profileImageId" INT,
      ADD CONSTRAINT "fk_profileImage" FOREIGN KEY ("profileImageId") REFERENCES "profileImage"(id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users
        DROP CONSTRAINT fk_profileImage
        DROP COLUMN "profileImageId";`);
  }
}
