import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class UserTicketMigration1640596821905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_ticket',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'event_id',
            type: 'varchar',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('user_ticket', [
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'event',
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_ticket');
  }
}
