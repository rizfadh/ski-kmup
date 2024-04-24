/*
  Warnings:

  - The `division` column on the `RegisterApproval` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RegisterApproval" DROP COLUMN "division",
ADD COLUMN     "division" TEXT[];
