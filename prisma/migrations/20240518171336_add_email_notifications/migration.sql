-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `type` ENUM('IN_APP', 'EMAIL') NOT NULL DEFAULT 'IN_APP';
