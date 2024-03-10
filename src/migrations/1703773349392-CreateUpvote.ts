import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUpvote1703773349392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS upvote (
        id SERIAL PRIMARY KEY,
        upvoted BOOLEAN DEFAULT true,
        reviewId INT NOT NULL,
        CONSTRAINT fk_review FOREIGN KEY (reviewId) REFERENCES review(id),
        userId INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id)
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE upvote;`);
  }
}
