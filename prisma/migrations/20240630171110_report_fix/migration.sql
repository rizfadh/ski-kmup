/*
  Warnings:

  - You are about to drop the column `documentUrl` on the `AccountablityReport` table. All the data in the column will be lost.
  - Added the required column `reportUrl` to the `AccountablityReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountablityReport" DROP COLUMN "documentUrl",
ADD COLUMN     "reportUrl" TEXT NOT NULL;
