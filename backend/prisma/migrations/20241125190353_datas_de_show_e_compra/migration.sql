/*
  Warnings:

  - Added the required column `data` to the `compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Show_data_key` ON `show`;

-- AlterTable
ALTER TABLE `compra` ADD COLUMN `data` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `show` MODIFY `data` VARCHAR(10) NOT NULL;
