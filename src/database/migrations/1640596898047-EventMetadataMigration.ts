import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class EventMetadataMigration1640596898047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_metadata',
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
            name: 'metadata_type_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('event_metadata', [
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'event',
      }),
      new TableForeignKey({
        columnNames: ['metadata_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'metadata_type',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_metadata');
  }
}
