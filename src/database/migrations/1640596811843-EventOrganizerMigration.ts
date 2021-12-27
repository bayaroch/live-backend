import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class EventOrganizerMigration1640596811843
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_organizer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'event_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('event_organizer', [
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
    await queryRunner.dropTable('event_organizer');
  }
}
