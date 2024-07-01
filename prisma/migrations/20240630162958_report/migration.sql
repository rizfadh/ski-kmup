/*
  Warnings:

  - You are about to drop the `workProgramNeeds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workProgramNeeds" DROP CONSTRAINT "workProgramNeeds_workProgramId_fkey";

-- DropTable
DROP TABLE "workProgramNeeds";

-- CreateTable
CREATE TABLE "WorkProgramNeeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "workProgramId" TEXT NOT NULL,

    CONSTRAINT "WorkProgramNeeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountablityReport" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "secretaryConfirm" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountablityReport_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "WorkProgramNeeds" ADD CONSTRAINT "WorkProgramNeeds_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountablityReport" ADD CONSTRAINT "AccountablityReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
