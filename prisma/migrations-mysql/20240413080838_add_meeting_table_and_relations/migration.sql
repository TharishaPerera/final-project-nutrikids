/*
  Warnings:

  - The values [CANCELED] on the enum `Appointment_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Availabilty` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pediatricianId,appointmentDate,timeslot]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Availabilty` DROP FOREIGN KEY `Availabilty_pediatricianId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `status` ENUM('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED') NOT NULL DEFAULT 'SCHEDULED';

-- DropTable
DROP TABLE `Availabilty`;

-- CreateTable
CREATE TABLE `Availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pediatricianId` VARCHAR(191) NOT NULL,
    `hospital` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `dateOfWeek` VARCHAR(191) NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyMeeting` (
    `id` VARCHAR(191) NOT NULL,
    `appointmentId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `privacy` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `config` JSON NOT NULL,
    `status` ENUM('CREATED', 'COMPLETED', 'CANCELLED', 'EXPIRED') NOT NULL DEFAULT 'CREATED',

    UNIQUE INDEX `DailyMeeting_appointmentId_key`(`appointmentId`),
    UNIQUE INDEX `DailyMeeting_id_appointmentId_key`(`id`, `appointmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_pediatricianId_appointmentDate_timeslot_key` ON `Appointment`(`pediatricianId`, `appointmentDate`, `timeslot`);

-- AddForeignKey
ALTER TABLE `Availability` ADD CONSTRAINT `Availability_pediatricianId_fkey` FOREIGN KEY (`pediatricianId`) REFERENCES `Pediatrician`(`pediatricianId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyMeeting` ADD CONSTRAINT `DailyMeeting_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
