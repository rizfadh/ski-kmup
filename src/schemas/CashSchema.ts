import { z } from "zod";

export const CashSetFormSchema = z.object({
  amount: z.union([
    z.coerce.number().gte(1000, { message: "Minimal 1000" }),
    z.literal("").refine(() => false),
  ]),
  months: z.union([
    z.coerce
      .number()
      .gte(1, { message: "Minimal 1 bulan" })
      .lte(12, { message: "Maksimal 12 bulan" }),
    z.literal("").refine(() => false),
  ]),
});

export const CashSetSchema = z.object({
  amount: z.number().gte(1000, { message: "Minimal 1000" }),
  months: z
    .number()
    .gte(1, { message: "Minimal 1 bulan" })
    .lte(12, { message: "Maksimal 12 bulan" }),
});

export const CashMidtransSchema = z.object({
  id: z.string().trim().min(1, { message: "Id wajib diisi" }),
  month: z.string().trim().min(1, { message: "Bulan wajib diisi" }),
  amount: z.number().gte(1000, { message: "Minimal 1000" }),
});

export const CashInOutFormSchema = z.object({
  description: z.string().trim().min(1, { message: "Keterangan wajib diisi" }),
  amount: z.union([
    z.coerce.number().gte(1000, { message: "Minimal 1000" }),
    z.literal("").refine(() => false),
  ]),
  date: z.string().trim().min(1, { message: "Tanggal wajib diisi" }),
});

export const CashInOutSchema = z.object({
  description: z.string().trim().min(1, { message: "Keterangan wajib diisi" }),
  amount: z.number().gte(1000, { message: "Minimal 1000" }),
  date: z.date({ required_error: "Tanggal wajib diisi" }),
});
