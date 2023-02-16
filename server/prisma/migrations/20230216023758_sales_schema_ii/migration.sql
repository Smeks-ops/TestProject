/*
  Warnings:

  - Added the required column `modeOfDelivery` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sales` ADD COLUMN `deliveryDate` DATETIME(3) NULL,
    ADD COLUMN `modeOfDelivery` ENUM('COURIER', 'SELF') NOT NULL,
    ADD COLUMN `modeOfPayment` VARCHAR(191) NULL,
    ADD COLUMN `paymentAmount` INTEGER NULL,
    ADD COLUMN `paymentDate` DATETIME(3) NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NULL,
    ADD COLUMN `salesDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
