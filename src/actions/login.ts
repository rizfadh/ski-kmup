"use server";

import { LoginSchema } from "@/schemas/LoginSchema";
import { LoginResult } from "@/types/LoginResult";
import { z } from "zod";

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
