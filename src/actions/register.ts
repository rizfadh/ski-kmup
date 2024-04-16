"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  console.log(data);
};
