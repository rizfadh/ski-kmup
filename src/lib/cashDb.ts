import { CashInOutType } from "@prisma/client";
import db from "./db";
import { endOfMonth, startOfMonth } from "date-fns";

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

export const getCashInOut = async (type: CashInOutType) => {
  const cash = await db.cashInOut.findMany({
    where: { type },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return cash.map((cash) => {
    return {
      id: cash.id,
      type: cash.type,
      description: cash.description,
      amount: cash.amount,
      date: cash.date,
      createdBy: cash.user.name,
      createdAt: cash.createdAt,
    };
  });
};

export const getCashInOutInfo = async (type: CashInOutType) => {
  const now = new Date();
  const startOfMonthDate = startOfMonth(now);
  const endOfMonthDate = endOfMonth(now);

  const cashMonthQuery = db.cashInOut.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type,
      date: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
    },
  });

  const cashPeriodQuery = db.cashInOut.aggregate({
    _sum: {
      amount: true,
    },
    where: { type },
  });

  const [cashMonth, cashPeriod] = await Promise.all([
    cashMonthQuery,
    cashPeriodQuery,
  ]);

  return {
    cashMonth: cashMonth._sum.amount || 0,
    cashPeriod: cashPeriod._sum.amount || 0,
  };
};

export const getCashPaidLate = async (id: string) => {
  const cashMonths = db.cashPayment.count({
    where: { userId: id },
  });

  const cashPaid = db.cashPayment.count({
    where: { userId: id, paid: true },
  });

  const cashLate = db.cashPayment.count({
    where: { userId: id, due: { lt: new Date() } },
  });

  const [months, paid, late] = await Promise.all([
    cashMonths,
    cashPaid,
    cashLate,
  ]);

  return {
    months,
    paid,
    late,
  };
};

export const getCashInfo = async (id: string) => {
  const cashAmount = db.cashPayment.findFirst({
    where: { userId: id },
    select: {
      amount: true,
    },
  });

  const [cashIn, cashOut, getAmount, monthPaidLate] = await Promise.all([
    getCashInOutInfo("IN"),
    getCashInOutInfo("OUT"),
    cashAmount,
    getCashPaidLate(id),
  ]);

  const amount = getAmount?.amount ?? 0;
  const { months, paid, late } = monthPaidLate;

  const userCashInfo = {
    monthsPaid: paid,
    monthsTotal: months,
    monthsPaidAmount: amount * paid,
    monthsTotalAmount: amount * months,
    monthsLate: late,
    monthsLateAmount: amount * late,
  };

  return {
    cashIn,
    cashOut,
    amount,
    months,
    userCashInfo,
  };
};
