import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  resolveDateDefault,
  resolveDateType,
  resolveGenerationStrategy,
  resolveIdDefault,
  resolveIdType,
} from './utils/migration-helpers';

export class createTableTask1763747758634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dbType = queryRunner.connection.options.type;

    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: resolveIdType(dbType),
            isPrimary: true,
            isNullable: false,
            generationStrategy: resolveGenerationStrategy(dbType),
            default: resolveIdDefault(dbType),
          },
          {
            name: 'title',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'userId',
            type: resolveIdType(dbType),
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: resolveDateType(dbType),
            default: resolveDateDefault(dbType),
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: resolveDateType(dbType),
            default: resolveDateDefault(dbType),
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: resolveDateType(dbType),
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
