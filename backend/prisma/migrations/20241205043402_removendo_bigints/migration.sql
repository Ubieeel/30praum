-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_admin` CHAR(7) NULL,
    MODIFY `telefone` VARCHAR(191) NULL;
