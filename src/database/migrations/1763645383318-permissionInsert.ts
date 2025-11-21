import { MigrationInterface, QueryRunner } from 'typeorm';

export class ermissionInsert1763645383318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO permissions ( name)
      VALUES
        ( 'ADMIN'),
        ( 'USER');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      delete from permissions where name in ('ADMIN', 'USER');

    `);
  }
}
