import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .trim()
    .min(4, { message: "Password minimal 4 karakter" }),
});
