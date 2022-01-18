import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventOrganizerChanges1642477488206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `channel_tag` DROP FOREIGN KEY `FK_9a80a63d34f140cc56edd710613`',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` DROP FOREIGN KEY `FK_7584a473c45d755e191c6f2ef3d`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` DROP FOREIGN KEY `FK_bd62e2ee72bb4ec4e3d26ec2f6a`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` DROP FOREIGN KEY `FK_1a6cbd203c6bc8557d76a0776f5`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` DROP FOREIGN KEY `FK_0817c16131339484069f1af3cb3`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` DROP FOREIGN KEY `FK_3e14269b87b47488d088493fe5b`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_ticket` DROP FOREIGN KEY `FK_d248c45296254d3b3a3fea374f1`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_ticket` DROP FOREIGN KEY `FK_a52a3da0e99785f39047c6373e6`',
    );
    await queryRunner.query(
      'DROP INDEX `UQ_97672ac88f789774dd47f7c8be3` ON `users`',
    );
    await queryRunner.query(
      'CREATE TABLE `event_organizers` (`event_id` varchar(36) NOT NULL, `user_id` varchar(36) NOT NULL, INDEX `IDX_64b592355e149a4d47def2412d` (`event_id`), INDEX `IDX_1dd4c4652b67727b9f1f545342` (`user_id`), PRIMARY KEY (`event_id`, `user_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` DROP COLUMN `channel_id`',
    );
    await queryRunner.query('ALTER TABLE `channel_tag` DROP COLUMN `tag_id`');
    await queryRunner.query(
      'ALTER TABLE `event_channel` DROP COLUMN `event_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` DROP COLUMN `channel_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` DROP COLUMN `event_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` DROP COLUMN `metadata_type_id`',
    );
    await queryRunner.query('ALTER TABLE `user_ticket` DROP COLUMN `user_id`');
    await queryRunner.query('ALTER TABLE `user_ticket` DROP COLUMN `event_id`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `is_deleted` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` CHANGE `id` `id` int NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `id`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `id` varchar(36) NOT NULL PRIMARY KEY',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `authorized`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `authorized` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` DROP COLUMN `ingestEndpoint`',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `ingestEndpoint` int NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `playbackUrl`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `playbackUrl` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` DROP COLUMN `recordingConfigurationArn`',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `recordingConfigurationArn` int NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `type`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `type` datetime NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `users` ADD UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`)',
    );
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `password`');
    await queryRunner.query(
      'ALTER TABLE `users` ADD `password` varchar(60) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `balance`');
    await queryRunner.query(
      'ALTER TABLE `users` ADD `balance` int NOT NULL DEFAULT 0',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `ticket_price`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `ticket_price` int NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `event_start`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `event_start` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `event_end`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `event_end` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `sale_start`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `sale_start` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `sale_end`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `sale_end` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_64b592355e149a4d47def2412d5` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_1dd4c4652b67727b9f1f5453425` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.dropTable('event_organizer');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_1dd4c4652b67727b9f1f5453425`',
    );
    await queryRunner.query(
      'ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_64b592355e149a4d47def2412d5`',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `sale_end`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `sale_end` datetime NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `sale_start`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `sale_start` datetime NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `event_end`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `event_end` datetime NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `event_start`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `event_start` datetime NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `ticket_price`');
    await queryRunner.query(
      'ALTER TABLE `event` ADD `ticket_price` float NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `balance`');
    await queryRunner.query(
      "ALTER TABLE `users` ADD `balance` float NOT NULL DEFAULT '0'",
    );
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `password`');
    await queryRunner.query(
      'ALTER TABLE `users` ADD `password` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `users` DROP INDEX `IDX_97672ac88f789774dd47f7c8be`',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `type`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `type` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` DROP COLUMN `recordingConfigurationArn`',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `recordingConfigurationArn` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `playbackUrl`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `playbackUrl` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` DROP COLUMN `ingestEndpoint`',
    );
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `ingestEndpoint` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `authorized`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `authorized` tinyint(1) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `id`');
    await queryRunner.query(
      'ALTER TABLE `channel` ADD `id` int NOT NULL AUTO_INCREMENT',
    );
    await queryRunner.query('ALTER TABLE `channel` ADD PRIMARY KEY (`id`)');
    await queryRunner.query(
      'ALTER TABLE `channel` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT',
    );
    await queryRunner.query('ALTER TABLE `event` DROP COLUMN `is_deleted`');
    await queryRunner.query(
      'ALTER TABLE `user_ticket` ADD `event_id` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `user_ticket` ADD `user_id` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` ADD `metadata_type_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` ADD `event_id` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` ADD `channel_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` ADD `event_id` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` ADD `tag_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` ADD `channel_id` int NOT NULL',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_1dd4c4652b67727b9f1f545342` ON `event_organizers`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_64b592355e149a4d47def2412d` ON `event_organizers`',
    );
    await queryRunner.query('DROP TABLE `event_organizers`');
    await queryRunner.query(
      'CREATE UNIQUE INDEX `UQ_97672ac88f789774dd47f7c8be3` ON `users` (`email`)',
    );
    await queryRunner.query(
      'ALTER TABLE `user_ticket` ADD CONSTRAINT `FK_a52a3da0e99785f39047c6373e6` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user_ticket` ADD CONSTRAINT `FK_d248c45296254d3b3a3fea374f1` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` ADD CONSTRAINT `FK_3e14269b87b47488d088493fe5b` FOREIGN KEY (`metadata_type_id`) REFERENCES `metadata_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `event_metadata` ADD CONSTRAINT `FK_0817c16131339484069f1af3cb3` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` ADD CONSTRAINT `FK_1a6cbd203c6bc8557d76a0776f5` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `event_channel` ADD CONSTRAINT `FK_bd62e2ee72bb4ec4e3d26ec2f6a` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` ADD CONSTRAINT `FK_7584a473c45d755e191c6f2ef3d` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `channel_tag` ADD CONSTRAINT `FK_9a80a63d34f140cc56edd710613` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
