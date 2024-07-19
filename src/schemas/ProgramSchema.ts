import { getDateNowIgnoreTime } from "@/lib/utils";
import { z } from "zod";

const NeedsFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Keperluan wajib diisi" }),
  amount: z.union([
    z.coerce.number().gte(1000, { message: "Minimal 1000" }),
    z.literal("").refine(() => false),
  ]),
});

export const ProgramPlanFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Nama program wajib diisi" }),
  date: z.coerce
    .date({ required_error: "Tanggal wajib diisi" })
    .min(getDateNowIgnoreTime(), { message: "Tanggal sudah lewat" }),
  needs: z.array(NeedsFormSchema).optional(),
});

const NeedsSchema = z.object({
  name: z.string().trim().min(1, { message: "Nama wajib diisi" }),
  amount: z.number().gte(1000, { message: "Minimal 1000" }),
});

export const ProgramPlanSchema = z.object({
  name: z.string().trim().min(1, { message: "Nama program wajib diisi" }),
  date: z
    .date({ required_error: "Tanggal wajib diisi" })
    .min(getDateNowIgnoreTime(), { message: "Tanggal sudah lewat" }),
  needs: z.array(NeedsSchema).optional(),
});

const MAX_FILE_SIZE = 1024 * 500;
export const ACCEPTED_DOC_MIME_TYPES = "application/pdf";

export const DocumentSchema = z.object({
  pdf: z
    .instanceof(File, { message: "PDF Tidak boleh kosong" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimum 500KB")
    .refine(
      (file) => file.type === ACCEPTED_DOC_MIME_TYPES,
      "Hanya .pdf saja yang didukung",
    ),
});
