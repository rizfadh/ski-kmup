import { z } from "zod";

export const AdviceSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  for: z.string().min(1, { message: "Wajib dipilih" }),
  suggestion: z.string().trim().min(1, { message: "Saran wajib diisi" }),
});
