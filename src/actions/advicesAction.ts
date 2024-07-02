"use server";

import { privateRoutes } from "@/constants/routes";
import db from "@/lib/db";
import getSession from "@/lib/getSession";
import { AdviceSchema } from "@/schemas/AdviceSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const submitAdvice = async (data: z.infer<typeof AdviceSchema>) => {
  const validated = AdviceSchema.safeParse(data);
  if (!validated.success) return { error: true, message: "Invalid fields" };

  const { email, adviceFor, advice } = validated.data;

  try {
    await db.advice.create({
      data: {
        email,
        adviceFor,
        advice,
      },
    });

    revalidatePath(privateRoutes.advices);
    return { error: false, message: "Saran terkirim" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteAdvice = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFMEDCEN") {
      return { error: true, message: "Unauthorized" };
    }

    await db.advice.delete({
      where: { id },
    });

    revalidatePath(privateRoutes.advices);
    return { error: false, message: "Saran dihapus" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
