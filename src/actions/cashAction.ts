"use server";

import { privateRoutes } from "@/constants/routes";
import { dateFormatMonth } from "@/lib/formatter";
import db from "@/lib/db";
import {
  CashInOutSchema,
  CashMidtransSchema,
  CashSetSchema,
} from "@/schemas/CashSchema";
import { CashInOutType, UserRole } from "@prisma/client";
import { add } from "date-fns";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isCashSet } from "@/lib/cashDb";
import { createId } from "@paralleldrive/cuid2";

// @ts-ignore
import midtransClient from "midtrans-client";
import getSession from "@/lib/getSession";

export const setCash = async (data: z.infer<typeof CashSetSchema>) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "TREASURER") {
      return { error: true, message: "Unauthorized" };
    }

    const validated = CashSetSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { amount, months } = validated.data;

    const cashSet = await isCashSet();

    if (cashSet) return { error: true, message: "Iuran kas sudah diatur" };

    const users = await db.user.findMany({
      select: {
        id: true,
      },
      where: {
        userPosition: {
          role: {
            notIn: [UserRole.PASSIVE, UserRole.ADMIN],
          },
        },
      },
    });

    const monthsArr = Array.from(Array(months).keys());

    const setCashPayment = users.flatMap((user) =>
      monthsArr.map((i) => {
        const now = new Date();
        const date = add(now, { months: i });
        const month = dateFormatMonth(date);
        const due = add(date, { months: 1 });

        return db.cashPayment.create({
          data: {
            userId: user.id,
            due,
            amount,
            month,
          },
        });
      }),
    );

    await Promise.all(setCashPayment);

    revalidatePath(privateRoutes.cashManage);
    return { error: false, message: "Iuran kas berhasil ditetapkan" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const cashMidtrans = async (
  data: z.infer<typeof CashMidtransSchema>,
) => {
  try {
    const validated = CashMidtransSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { id, amount, month } = validated.data;

    const session = await getSession();
    if (!session || !session.user)
      return { error: true, message: "Unauthorized" };

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const cuid = createId();

    await db.cashPaymentHistory.create({
      data: {
        id: cuid,
        paymentId: id,
        amount,
        status: "Gagal",
        paymentType: "Belum dipilih",
        time: new Date(),
      },
    });

    const parameter = {
      transaction_details: {
        order_id: cuid,
        gross_amount: amount,
      },
      item_details: [
        {
          id,
          price: amount,
          quantity: 1,
          name: `Kas bulan ${month}`,
        },
      ],
      customer_details: {
        first_name: session.user.name,
        email: session.user.email,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return { error: false, token };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const addCashInOut = async (
  type: CashInOutType,
  data: z.infer<typeof CashInOutSchema>,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "TREASURER") {
      return { error: true, message: "Unauthorized" };
    }

    const validated = CashInOutSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { description, amount, date } = validated.data;

    await db.cashInOut.create({
      data: {
        userId: session.user.id as string,
        type,
        description,
        amount,
        date,
      },
    });

    const path = type === "IN" ? privateRoutes.cashIn : privateRoutes.cashOut;

    revalidatePath(path);

    return { error: false, message: "Kas berhasil ditambahkan" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteCashInOut = async (id: string, type: CashInOutType) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "TREASURER") {
      return { error: true, message: "Unauthorized" };
    }

    await db.cashInOut.delete({ where: { id } });

    const path = type === "IN" ? privateRoutes.cashIn : privateRoutes.cashOut;

    revalidatePath(path);

    return { error: false, message: "Kas berhasil dihapus" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const updateCashInOut = async (
  id: string,
  type: CashInOutType,
  data: z.infer<typeof CashInOutSchema>,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "TREASURER") {
      return { error: true, message: "Unauthorized" };
    }

    const validated = CashInOutSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { description, amount, date } = validated.data;

    await db.cashInOut.update({
      where: { id },
      data: {
        description,
        amount,
        date,
      },
    });

    const path = type === "IN" ? privateRoutes.cashIn : privateRoutes.cashOut;

    revalidatePath(path);

    return { error: false, message: "Kas berhasil diupdate" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const setUserCashPaid = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "TREASURER") {
      return { error: true, message: "Unauthorized" };
    }

    const cash = await db.cashPayment.update({
      where: { id },
      data: {
        paid: true,
      },
    });

    await db.cashPaymentHistory.create({
      data: {
        paymentId: id,
        amount: cash.amount,
        status: "Sukses",
        paymentType: "Bendahara",
        time: new Date(),
      },
    });

    revalidatePath(privateRoutes.cashManageUser(id));

    return { error: false, message: "Kas berhasil diubah" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
