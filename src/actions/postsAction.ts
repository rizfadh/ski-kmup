"use server";

import { db } from "@/lib/db";
import { PostActionSchema } from "@/schemas/PostSchema";
import { z } from "zod";

export const newPostAction = async (data: z.infer<typeof PostActionSchema>) => {
  const validated = PostActionSchema.parse(data);
  const { id, imageUrl, title, content } = validated;

  await db.post.create({
    data: {
      createdBy: id,
      imageUrl,
      title,
      content,
    },
  });
};
