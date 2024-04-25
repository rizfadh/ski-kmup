-- CreateTable
CREATE TABLE "Advice" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adviceFor" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);
