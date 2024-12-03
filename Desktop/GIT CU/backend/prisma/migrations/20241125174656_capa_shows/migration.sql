/*
  Warnings:

  - Added the required column `capa` to the `show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `show` ADD COLUMN `capa` VARCHAR(20) NOT NULL;
