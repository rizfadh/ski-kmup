/*
  Warnings:

  - You are about to drop the column `amount` on the `CashPayment` table. All the data in the column will be lost.
  - Added the required column `cashAmountId` to the `CashPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashPayment" DROP COLUMN "amount",
ADD COLUMN     "cashAmountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CashAmount" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashAmount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashPayment" ADD CONSTRAINT "CashPayment_cashAmountId_fkey" FOREIGN KEY ("cashAmountId") REFERENCES "CashAmount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
