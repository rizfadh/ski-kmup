/*
  Warnings:

  - Added the required column `userId` to the `WorkProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkProgram" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkProgram" ADD CONSTRAINT "WorkProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
