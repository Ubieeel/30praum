/*
  Warnings:

  - You are about to drop the column `is_admin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `filme` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rg]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cidade` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nascimento` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `is_admin`,
    ADD COLUMN `cidade` VARCHAR(20) NOT NULL,
    ADD COLUMN `cpf` BIGINT NOT NULL,
    ADD COLUMN `endereco` VARCHAR(20) NOT NULL,
    ADD COLUMN `nascimento` DATE NOT NULL,
    ADD COLUMN `rg` VARCHAR(11) NOT NULL,
    ADD COLUMN `sexo` CHAR(1) NULL,
    ADD COLUMN `telefone` BIGINT NOT NULL,
    ADD COLUMN `uf` CHAR(2) NOT NULL;



-- CreateTable
CREATE TABLE `compra` (
    `codigo` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` BIGINT NOT NULL,
    `registro` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `quantidade` INTEGER NOT NULL,

    INDEX `Compra_cpf_fkey`(`cpf`),
    INDEX `Compra_registro_fkey`(`registro`),
    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `show` (
    `registro` INTEGER NOT NULL,
    `data` DATE NOT NULL,
    `horario` VARCHAR(20) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `endereco` VARCHAR(20) NOT NULL,
    `artista` VARCHAR(100) NOT NULL,
    `nome` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Show_data_key`(`data`),
    PRIMARY KEY (`registro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_rg_key` ON `user`(`rg`);

-- CreateIndex
CREATE UNIQUE INDEX `user_cpf_key` ON `user`(`cpf`);

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `Compra_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `user`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `Compra_registro_fkey` FOREIGN KEY (`registro`) REFERENCES `show`(`registro`) ON DELETE RESTRICT ON UPDATE CASCADE;
