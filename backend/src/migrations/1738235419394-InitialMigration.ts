import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738235419394 implements MigrationInterface {
  name = "InitialMigration1738235419394";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article_image" ALTER COLUMN "lastModified" SET DEFAULT '1738235421540'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(100) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_image" ALTER COLUMN "lastModified" SET DEFAULT '1738235122469'`,
    );
  }
}
