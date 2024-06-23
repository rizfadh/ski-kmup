/*
  Warnings:

  - You are about to drop the `CashIn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashOut` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CashInOutType" AS ENUM ('IN', 'OUT');

-- DropForeignKey
ALTER TABLE "CashIn" DROP CONSTRAINT "CashIn_userId_fkey";

-- DropForeignKey
ALTER TABLE "CashOut" DROP CONSTRAINT "CashOut_userId_fkey";

-- DropTable
DROP TABLE "CashIn";

-- DropTable
DROP TABLE "CashOut";

-- CreateTable
CREATE TABLE "CashInOut" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CashInOutType" NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashInOut_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashInOut" ADD CONSTRAINT "CashInOut_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
