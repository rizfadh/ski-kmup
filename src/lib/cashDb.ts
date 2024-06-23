import { CashInOutType } from "@prisma/client";
import db from "./db";

export const isCashAmountExist = async () => {
  const cash = await db.cashPayment.findFirst();
  return !!cash;
};

export const getUserCash = async (id: string) => {
  return await db.cashPayment.findMany({
    where: { userId: id },
    orderBy: { due: "asc" },
  });
};

export const getUserCashHistory = async (id: string) => {
  const cashHistory = await db.cashPayment.findMany({
    where: { userId: id },
    select: {
      month: true,
      cashPaymentHistory: true,
    },
  });

  return cashHistory.flatMap((cash) => {
    return cash.cashPaymentHistory.map((history) => {
      return {
        month: cash.month,
        ...history,
      };
    });
  });
};

export const getCashIn = async () => {
  const cashIn = await db.cashInOut.findMany({
    where: { type: CashInOutType.IN },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return cashIn.map((cash) => {
    return {
      id: cash.id,
      description: cash.description,
      amount: cash.amount,
      date: cash.date,
      createdBy: cash.user.name,
      createdAt: cash.createdAt,
    };
  });
};
