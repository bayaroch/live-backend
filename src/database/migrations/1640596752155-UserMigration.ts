import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1640596752155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'balance',
            type: 'float',
            default: 0,
          },
          {
            name: 'type',
            type: 'int',
            default: 1,
          },
          {
            name: 'isConfirmed',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'confirmToken',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
