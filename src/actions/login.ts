"use server";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export type LoginResult = { error: boolean; message: string };

export const login = async (
  data: z.infer<typeof loginSchema>,
): Promise<LoginResult> => {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  return {
    error: false,
    message: "Formatnya udah bener, sayang ini masih dummy",
  };
};
