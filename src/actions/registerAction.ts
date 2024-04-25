"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/ActionResponse";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { getUserByEmail } from "@/lib/userDb";

export const register = async (
  data: z.infer<typeof RegisterSchema>,
): Promise<ActionResponse> => {
  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  const {
    email,
    name,
    phoneNumber,
    domicile,
    faculty,
    major,
    division_1,
    division_2,
    reason,
    password,
  } = validated.data;

  try {
    const userExist = await getUserByEmail(email);
    if (!!userExist) return { error: true, message: "Email sudah terdaftar" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        domicile,
        faculty,
        major,
        registerApproval: {
          create: {
            division: [division_1, division_2],
            reason,
          },
        },
      },
      include: {
        registerApproval: true,
      },
    });
    return { error: false, message: "Daftar berhasil" };
  } catch {
    return { error: true, message: "Daftar gagal" };
  }
};
