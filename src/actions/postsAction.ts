"use server";

import { privateRoutes } from "@/constants/routes";
import { db } from "@/lib/db";
import { DeletePostSchema, NewPostSchema } from "@/schemas/PostSchema";
import { storage } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { storageRef } from "@/constants/storageRef";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { createId } from "@paralleldrive/cuid2";

export const newPost = async (formData: FormData) => {
  try {
    const data = {
      id: formData.get("id"),
      image: formData.get("image"),
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const validated = NewPostSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { id, image, title, content } = validated.data;
    const cuid = createId();
    const imageRef = ref(storage, storageRef.postsImages + cuid);

    await uploadBytes(imageRef, image);

    const imageUrl = await getDownloadURL(imageRef);

    await db.post.create({
      data: {
        id: cuid,
        createdBy: id,
        imageUrl,
        title,
        content,
      },
    });

    revalidatePath(privateRoutes.postsManage);
    return {
      error: false,
      message:
        "Postingan berhasil dibuat, menunggu persetujuan divisi Media Center",
    };
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deletePost = async (data: z.infer<typeof DeletePostSchema>) => {
  try {
    const validated = DeletePostSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { id, pathToRevalidate } = validated.data;

    await db.post.delete({
      where: { id },
    });

    const imageRef = ref(storage, storageRef.postsImages + id);

    await deleteObject(imageRef);

    revalidatePath(pathToRevalidate);
    return { error: false, message: "Postingan berhasil dihapus" };
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const acceptPost = async (id: string) => {
  try {
    await db.post.update({
      where: { id },
      data: {
        isAccepted: true,
      },
    });

    revalidatePath(privateRoutes.postsManage);
    return { error: false, message: "Postingan berhasil diterima" };
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};
