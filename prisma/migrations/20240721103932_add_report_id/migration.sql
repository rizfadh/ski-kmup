/*
  Warnings:

  - The primary key for the `AccountablityReport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `AccountablityReport` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "AccountablityReport" DROP CONSTRAINT "AccountablityReport_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AccountablityReport_pkey" PRIMARY KEY ("id");
