/*
  Warnings:

  - Added the required column `level` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserRole` ADD COLUMN `level` INTEGER NOT NULL AFTER `id`;
