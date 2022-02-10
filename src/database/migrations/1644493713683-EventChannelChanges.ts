import {MigrationInterface, QueryRunner} from "typeorm";

export class EventChannelChanges1644493713683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` ADD `value` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` ADD `channelArn` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` ADD `eventId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `channel` ADD UNIQUE INDEX `IDX_c68d62598684f2403463f5a0af` (`eventId`)");
        await queryRunner.query("ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_1dd4c4652b67727b9f1f5453425`");
        await queryRunner.query("ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_64b592355e149a4d47def2412d5`");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `authorized`");
        await queryRunner.query("ALTER TABLE `channel` ADD `authorized` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `ingestEndpoint`");
        await queryRunner.query("ALTER TABLE `channel` ADD `ingestEndpoint` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `playbackUrl`");
        await queryRunner.query("ALTER TABLE `channel` ADD `playbackUrl` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `recordingConfigurationArn`");
        await queryRunner.query("ALTER TABLE `channel` ADD `recordingConfigurationArn` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `channel` ADD `type` varchar(255) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_c68d62598684f2403463f5a0af` ON `channel` (`eventId`)");
        await queryRunner.query("ALTER TABLE `channel` ADD CONSTRAINT `FK_c68d62598684f2403463f5a0af6` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_64b592355e149a4d47def2412d5` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_1dd4c4652b67727b9f1f5453425` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_1dd4c4652b67727b9f1f5453425`");
        await queryRunner.query("ALTER TABLE `event_organizers` DROP FOREIGN KEY `FK_64b592355e149a4d47def2412d5`");
        await queryRunner.query("ALTER TABLE `channel` DROP FOREIGN KEY `FK_c68d62598684f2403463f5a0af6`");
        await queryRunner.query("DROP INDEX `REL_c68d62598684f2403463f5a0af` ON `channel`");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `channel` ADD `type` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `recordingConfigurationArn`");
        await queryRunner.query("ALTER TABLE `channel` ADD `recordingConfigurationArn` int NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `playbackUrl`");
        await queryRunner.query("ALTER TABLE `channel` ADD `playbackUrl` int NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `ingestEndpoint`");
        await queryRunner.query("ALTER TABLE `channel` ADD `ingestEndpoint` int NOT NULL");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `authorized`");
        await queryRunner.query("ALTER TABLE `channel` ADD `authorized` int NOT NULL");
        await queryRunner.query("ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_64b592355e149a4d47def2412d5` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `event_organizers` ADD CONSTRAINT `FK_1dd4c4652b67727b9f1f5453425` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `channel` DROP INDEX `IDX_c68d62598684f2403463f5a0af`");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `eventId`");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `channelArn`");
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `value`");
    }

}
