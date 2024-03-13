/*
  Warnings:

  - You are about to drop the column `isHelpfull` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `notHelpfull` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `isHelpfull`,
    DROP COLUMN `notHelpfull`;

-- CreateTable
CREATE TABLE `Helpful` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `postid` VARCHAR(191) NOT NULL,
    `isHelpful` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Helpful` ADD CONSTRAINT `Helpful_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Helpful` ADD CONSTRAINT `Helpful_postid_fkey` FOREIGN KEY (`postid`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
