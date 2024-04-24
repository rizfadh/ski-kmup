import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  name: z.string().trim().min(1, { message: "Nama wajib diisi" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Nomor HP wajib diisi" })
    .startsWith("08", { message: "Nomor HP harus dimulai dengan 08" }),
  domicile: z.string().trim().min(1, { message: "Domisili wajib diisi" }),
  faculty: z.string().min(1, { message: "Fakultas wajib dipilih" }),
  major: z.string().min(1, { message: "Jurusan wajib dipilih" }),
  division_1: z.string().min(1, { message: "Divisi 1 wajib dipilih" }),
  division_2: z.string().min(1, { message: "Divisi 2 wajib dipilih" }),
  reason: z
    .string()
    .trim()
    .min(1, { message: "Alasan masuk SKI-KMUP wajib diisi" }),
  password: z.string().min(4, { message: "Password minimal 4 karakter" }),
});
