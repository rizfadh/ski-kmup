import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 500;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const PostFormSchema = z.object({
  image: z
    .instanceof(File, { message: "Gambar Tidak boleh kosong" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimum 500KB")
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Hanya .jpg, .jpeg, .png and .webp yang didukung",
    ),
  title: z.string().trim().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().trim().min(1, { message: "Konten tidak boleh kosong" }),
});

export const PostFormUpdateSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimum 500KB")
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Hanya .jpg, .jpeg, .png and .webp yang didukung",
    )
    .optional(),
  title: z.string().trim().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().trim().min(1, { message: "Konten tidak boleh kosong" }),
});

export const NewPostSchema = z.object({
  image: z
    .instanceof(File, { message: "Gambar Tidak boleh kosong" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimum 500KB")
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Hanya .jpg, .jpeg, .png and .webp yang didukung",
    ),
  title: z.string().trim().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().trim().min(1, { message: "Konten tidak boleh kosong" }),
});

export const UpdatePostSchema = z.object({
  id: z.string().min(1, { message: "Id tidak boleh kosong" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimum 500KB")
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Hanya .jpg, .jpeg, .png and .webp yang didukung",
    )
    .nullable(),
  title: z.string().trim().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().trim().min(1, { message: "Konten tidak boleh kosong" }),
});

export const DeletePostSchema = z.object({
  id: z.string().min(1, { message: "Id tidak boleh kosong" }),
  pathToRevalidate: z.string().min(1, { message: "Path tidak boleh kosong" }),
});
