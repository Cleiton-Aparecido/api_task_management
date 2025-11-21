import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import {
  resolveDateDefault,
  resolveDateType,
  resolveGenerationStrategy,
  resolveIdDefault,
  resolveIdType,
} from './utils/migration-helpers';

export class UserPermission1763609353111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dbType = queryRunner.connection.options.type;

    await queryRunner.createTable(
      new Table({
        name: 'permissions',
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
            name: 'name',
            type: 'varchar',
            length: '255',
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
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users_permissions',
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
            name: 'userId',
            type: resolveIdType(dbType),
            isNullable: false,
          },
          {
            name: 'permissionId',
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
          {
            columnNames: ['permissionId'],
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'users_permissions',
      new TableIndex({
        name: 'IDX_USER_PERMISSION_UNIQUE',
        columnNames: ['userId', 'permissionId'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_permissions');
    await queryRunner.dropTable('permissions');
  }
}
