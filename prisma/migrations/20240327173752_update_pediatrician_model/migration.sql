/*
  Warnings:

  - You are about to drop the column `speacializations` on the `Pediatrician` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pediatrician` DROP COLUMN `speacializations`,
    ADD COLUMN `specializations` VARCHAR(191) NULL,
    MODIFY `qualifications` LONGTEXT NULL,
    MODIFY `description` LONGTEXT NULL;
