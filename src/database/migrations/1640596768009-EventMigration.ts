import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EventMigration1640596768009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'ticket_limit',
            type: 'int',
          },
          {
            name: 'ticket_price',
            type: 'float',
          },
          {
            name: 'cover_url',
            type: 'varchar',
          },
          {
            name: 'category',
            type: 'int',
          },
          {
            name: 'timezone',
            type: 'int',
          },
          {
            name: 'event_start',
            type: 'datetime',
          },
          {
            name: 'event_end',
            type: 'datetime',
          },
          {
            name: 'sale_start',
            type: 'datetime',
          },
          {
            name: 'sale_end',
            type: 'datetime',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event');
  }
}
