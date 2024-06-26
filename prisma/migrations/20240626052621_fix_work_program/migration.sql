/*
  Warnings:

  - You are about to drop the column `date` on the `WorkProgramPlan` table. All the data in the column will be lost.
  - Added the required column `date` to the `WorkProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkProgram" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkProgramPlan" DROP COLUMN "date";
