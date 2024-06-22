"use server";

import { privateRoutes } from "@/constants/routes";
import { dateFormatMonth } from "@/lib/formatter";
import db from "@/lib/db";
import { CashMidtransSchema, CashSetSchema } from "@/schemas/CashSchema";
import { UserRole } from "@prisma/client";
import { add } from "date-fns";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// @ts-ignore
import midtransClient from "midtrans-client";
import { auth } from "@/auth";

export const setCash = async (data: z.infer<typeof CashSetSchema>) => {
  try {
    const validated = CashSetSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { amount, months } = validated.data;

    await db.cashPayment.deleteMany();

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

    revalidatePath(privateRoutes.cash);
    return { error: false, message: "Iuran kas berhasil ditetapkan" };
  } catch {
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

    const session = await auth();
    if (!session || !session.user)
      return { error: true, message: "Unauthorized" };

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: id,
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
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};
