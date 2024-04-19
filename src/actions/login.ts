"use server";

import { LoginSchema } from "@/schemas/LoginSchema";
import { LoginResult } from "@/types/LoginResult";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { AuthError } from "next-auth";

export const login = async (
  data: z.infer<typeof LoginSchema>,
): Promise<LoginResult | null> => {
  const validated = LoginSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  try {
    await signIn("credentials", {
      ...validated.data,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "Email atau password salah" };
        case "AccessDenied":
          return {
            error: true,
            message: "Akun sedang menunggu verifikasi, coba lagi nanti",
          };
        default:
          return { error: true, message: "Terjadi kesalahan" };
      }
    }

    throw error;
  }

  return null;
};
