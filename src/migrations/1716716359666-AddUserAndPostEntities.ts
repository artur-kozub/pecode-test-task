import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndPostEntities implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`db.createCollection('user')`);
    await queryRunner.query(`db.createCollection('post')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`db.dropCollection('user')`);
    await queryRunner.query(`db.dropCollection('post')`);
  }
}