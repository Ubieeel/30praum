/*
  Warnings:

  - You are about to drop the column `rg` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_rg_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `rg`;
