/*
  Warnings:

  - The primary key for the `CashAmount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CashAmount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CashAmount" DROP CONSTRAINT "CashAmount_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CashAmount_pkey" PRIMARY KEY ("amount");
