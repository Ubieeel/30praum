/*
  Warnings:

  - You are about to drop the column `registro` on the `compra` table. All the data in the column will be lost.
  - Added the required column `registroid` to the `compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Compra_registro_fkey` ON `compra`;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `registro`,
    ADD COLUMN `registroid` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Compra_registro_fkey` ON `compra`(`registroid`);

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `Compra_registro_fkey` FOREIGN KEY (`registroid`) REFERENCES `show`(`registro`) ON DELETE RESTRICT ON UPDATE CASCADE;
