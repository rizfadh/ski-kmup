/*
  Warnings:

  - Added the required column `month` to the `CashPaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashPaymentHistory" ADD COLUMN     "month" TEXT NOT NULL;
