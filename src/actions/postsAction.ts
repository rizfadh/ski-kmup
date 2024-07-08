"use server";

import { privateRoutes, publicRoutes } from "@/constants/routes";
import db from "@/lib/db";
import {
  DeletePostSchema,
  NewPostSchema,
  UpdatePostSchema,
} from "@/schemas/PostSchema";
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
import getSession from "@/lib/getSession";

export const addPost = async (formData: FormData) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const data = {
      image: formData.get("image"),
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const validated = NewPostSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { image, title, content } = validated.data;
    const cuid = createId();
    const imageRef = ref(storage, storageRef.postsImages + cuid);

    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await db.post.create({
      data: {
        id: cuid,
        createdBy: session.user.id as string,
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
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const updatePost = async (formData: FormData) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFMEDCEN") {
      return { error: true, message: "Unauthorized" };
    }

    const data = {
      id: formData.get("id"),
      image: formData.get("image"),
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const validated = UpdatePostSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { id, image, title, content } = validated.data;

    if (image) {
      const imageRef = ref(storage, storageRef.postsImages + id);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await db.post.update({
        where: { id },
        data: {
          imageUrl,
          title,
          content,
        },
      });
    } else {
      await db.post.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
    }

    revalidatePath(privateRoutes.postsManage);
    return {
      error: false,
      message: "Postingan berhasil diupdate",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deletePost = async (data: z.infer<typeof DeletePostSchema>) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFMEDCEN") {
      return { error: true, message: "Unauthorized" };
    }

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
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const acceptPost = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFMEDCEN") {
      return { error: true, message: "Unauthorized" };
    }

    await db.post.update({
      where: { id },
      data: {
        isAccepted: true,
      },
    });

    revalidatePath(privateRoutes.postsManage);
    return { error: false, message: "Postingan berhasil diterima" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const likePost = async (userId: string, postId: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const postLike = await db.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (postLike?.like === true) {
      await db.postLike.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      revalidatePath(publicRoutes.postDetail(postId));
      return { error: false, message: "Like berhasil dihapus" };
    }

    if (postLike?.like === false) {
      await db.postLike.update({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        data: {
          like: true,
        },
      });

      revalidatePath(publicRoutes.postDetail(postId));
      return { error: false, message: "Postingan berhasil dilike" };
    }

    await db.postLike.create({
      data: {
        userId,
        postId,
        like: true,
      },
    });

    revalidatePath(publicRoutes.postDetail(postId));
    return { error: false, message: "Postingan berhasil dilike" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const dislikePost = async (userId: string, postId: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const postLike = await db.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (postLike?.like === false) {
      await db.postLike.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      revalidatePath(publicRoutes.postDetail(postId));
      return { error: false, message: "Dislike berhasil dihapus" };
    }

    if (postLike?.like === true) {
      await db.postLike.update({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        data: {
          like: false,
        },
      });

      revalidatePath(publicRoutes.postDetail(postId));
      return { error: false, message: "Postingan berhasil didislike" };
    }

    await db.postLike.create({
      data: {
        userId,
        postId,
        like: false,
      },
    });

    revalidatePath(publicRoutes.postDetail(postId));
    return { error: false, message: "Postingan berhasil didislike" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
