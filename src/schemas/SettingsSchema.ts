import { z } from "zod";

export const RoleSchema = z.object({
  position: z.string().min(1, { message: "Jabatan wajib dipilih" }),
});
