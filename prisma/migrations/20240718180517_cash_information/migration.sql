/*
  Warnings:

  - You are about to drop the column `cashAmountId` on the `CashPayment` table. All the data in the column will be lost.
  - You are about to drop the `CashAmount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `CashPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashInformationId` to the `CashPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CashPayment" DROP CONSTRAINT "CashPayment_cashAmountId_fkey";

-- AlterTable
ALTER TABLE "CashPayment" DROP COLUMN "cashAmountId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "cashInformationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CashAmount";

-- CreateTable
CREATE TABLE "CashInformation" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashPayment" ADD CONSTRAINT "CashPayment_cashInformationId_fkey" FOREIGN KEY ("cashInformationId") REFERENCES "CashInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
