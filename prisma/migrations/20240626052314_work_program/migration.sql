/*
  Warnings:

  - The primary key for the `RegisterApproval` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RegisterApproval` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'CHAIRMAN';
ALTER TYPE "UserRole" ADD VALUE 'TREASURER';
ALTER TYPE "UserRole" ADD VALUE 'SECRETARY';
ALTER TYPE "UserRole" ADD VALUE 'HEADOFDIVISION';
ALTER TYPE "UserRole" ADD VALUE 'HEADOFKPSDM';
ALTER TYPE "UserRole" ADD VALUE 'HEADOFMEDCEN';

-- DropIndex
DROP INDEX "RegisterApproval_userId_key";

-- AlterTable
ALTER TABLE "RegisterApproval" DROP CONSTRAINT "RegisterApproval_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RegisterApproval_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "WorkProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL,

    CONSTRAINT "WorkProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkProgramReport" (
    "workProgramId" TEXT NOT NULL,
    "implemented" BOOLEAN,
    "proofUrl" TEXT,

    CONSTRAINT "WorkProgramReport_pkey" PRIMARY KEY ("workProgramId")
);

-- CreateTable
CREATE TABLE "WorkProgramPlan" (
    "workProgramId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "chairmanConfirm" BOOLEAN,
    "treasurerConfirm" BOOLEAN,
    "secretaryConfirm" BOOLEAN,

    CONSTRAINT "WorkProgramPlan_pkey" PRIMARY KEY ("workProgramId")
);

-- CreateTable
CREATE TABLE "workProgramNeeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "workProgramId" TEXT NOT NULL,

    CONSTRAINT "workProgramNeeds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkProgramReport" ADD CONSTRAINT "WorkProgramReport_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramPlan" ADD CONSTRAINT "WorkProgramPlan_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workProgramNeeds" ADD CONSTRAINT "workProgramNeeds_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
