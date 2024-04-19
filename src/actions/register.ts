"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterResult } from "@/types/RegisterResult";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { getUserByEmail } from "@/lib/user";

export const register = async (
  data: z.infer<typeof RegisterSchema>,
): Promise<RegisterResult> => {
  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  const {
    email,
    name,
    phoneNumber,
    domicile,
    faculty,
    major,
    division,
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
            division,
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
