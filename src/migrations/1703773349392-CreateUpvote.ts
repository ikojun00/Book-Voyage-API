import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUpvote1703773349392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS upvote (
        id INT AUTO_INCREMENT PRIMARY KEY,
        upvoted BOOLEAN DEFAULT true,
        reviewId INT NOT NULL,
        userId INT NOT NULL );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE upvote;`);
  }
}
