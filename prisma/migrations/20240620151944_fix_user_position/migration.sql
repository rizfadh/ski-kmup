/*
  Warnings:

  - You are about to drop the column `position` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "position",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "UserPosition" (
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PASSIVE',

    CONSTRAINT "UserPosition_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserPosition" ADD CONSTRAINT "UserPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
