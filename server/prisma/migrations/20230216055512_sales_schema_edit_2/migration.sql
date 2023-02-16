/*
  Warnings:

  - You are about to drop the column `paymentAmount` on the `Sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Sales` DROP COLUMN `paymentAmount`,
    ADD COLUMN `amount` INTEGER NULL,
    MODIFY `deliveryDate` VARCHAR(191) NULL,
    MODIFY `paymentDate` VARCHAR(191) NULL;
