import { z } from "zod";

export const RoleSchema = z.object({
  position: z.string().min(1, { message: "Jabatan wajib dipilih" }),
});

export const ChangeTermSchema = z.object({
  confirmation: z.literal("SKI-KMUP"),
});

export const ChangeTermFormSchema = z.object({
  confirmation: z
    .string()
    .min(1, { message: "Kata wajib diisi" })
    .refine((value) => value === "SKI-KMUP", {
      message: "Kata tidak sama",
    }),
});
