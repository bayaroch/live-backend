import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ChannelMigration1640596778881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'channel',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'arn',
            type: 'varchar',
          },
          {
            name: 'authorized',
            type: 'boolean',
          },
          {
            name: 'ingestEndpoint',
            type: 'varchar',
          },
          {
            name: 'latencyMode',
            type: 'varchar',
          },
          {
            name: 'playbackUrl',
            type: 'varchar',
          },
          {
            name: 'recordingConfigurationArn',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('channel');
  }
}
