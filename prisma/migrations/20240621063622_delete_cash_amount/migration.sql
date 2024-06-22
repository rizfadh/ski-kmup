/*
  Warnings:

  - You are about to drop the `CashAmount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CashAmount";

-- CreateTable
CREATE TABLE "CashPayment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CashPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashPayment" ADD CONSTRAINT "CashPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
