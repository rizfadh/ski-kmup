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
