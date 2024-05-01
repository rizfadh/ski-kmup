import { storageRef } from "@/constants/storageRef";
import { storage } from "@/lib/firebase";
import { PostSchema } from "@/schemas/PostSchema";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { z } from "zod";
import { newPostAction } from "@/actions/postsAction";
import { db } from "./db";

export const newPost = async (data: z.infer<typeof PostSchema>) => {
  const validated = PostSchema.safeParse(data);

  if (!validated.success) return { error: true, message: "Invalid fields" };

  try {
    const { id, image, title, content } = validated.data;

    const imageRef = ref(storage, storageRef.postsImages + image.name);
    const uploadImage = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(uploadImage.ref);

    await newPostAction({ id, imageUrl, title, content });

    return { error: false, message: "Postingan berhasil dibuat" };
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const getPosts = async (isAccepted: boolean) => {
  const posts = await db.post.findMany({
    where: { isAccepted },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
      imageUrl: true,
      title: true,
      isAccepted: true,
    },
  });

  return posts.map((post) => {
    return {
      id: post.id,
      createdAt: post.createdAt,
      createdBy: post.user.name,
      imageUrl: post.imageUrl,
      title: post.title,
      isAccepted: post.isAccepted,
    };
  });
};
