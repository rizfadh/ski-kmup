"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export type LoginResult = { error: boolean; message: string };

export const login = async (
  data: z.infer<typeof LoginSchema>,
): Promise<LoginResult> => {
  const validated = LoginSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  console.log(data);

  return {
    error: false,
    message: "Formatnya udah bener, sayang ini masih dummy",
  };
};
