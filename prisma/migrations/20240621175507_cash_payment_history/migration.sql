-- CreateTable
CREATE TABLE "CashPaymentHistory" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashPaymentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashPaymentHistory" ADD CONSTRAINT "CashPaymentHistory_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "CashPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
