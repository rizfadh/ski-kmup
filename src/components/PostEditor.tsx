"use client";

import { useState } from "react";
import PostForm from "./PostForm";
import Image from "next/image";
import imageEmpty from "../../public/add-image.svg";
import { addPost, updatePost } from "@/actions/postsAction";
import { privateRoutes, publicRoutes } from "@/constants/routes";
import { PostFormSchema, PostFormUpdateSchema } from "@/schemas/PostSchema";

type Props = {
  type: "NEW" | "EDIT";
  id: string;
  imageUrl?: string;
  title?: string;
  content?: string;
};

export default function PostEditor({
  type,
  id,
  imageUrl,
  title,
  content,
}: Props) {
  const [imagePreview, setImagePreview] = useState<String | undefined>(
    imageUrl,
  );

  if (type === "NEW") {
    return (
      <div className="prose prose-sm mx-auto dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Image
          src={imagePreview ? imagePreview : imageEmpty}
          width="1024"
          height="576"
          alt="Image preview"
          className="not-prose mb-4 rounded-md shadow-md"
          priority
        />
        <PostForm
          id={id}
          Schema={PostFormSchema}
          setImagePreview={setImagePreview}
          title=""
          content=""
          submitAction={addPost}
          toRoute={publicRoutes.posts}
        />
      </div>
    );
  }

  return (
    <div className="prose prose-sm mx-auto dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
      <Image
        src={imagePreview ? imagePreview : imageEmpty}
        width="1024"
        height="576"
        alt="Image preview"
        className="not-prose mb-4 h-auto w-full rounded-md shadow-md"
        priority
      />
      <PostForm
        id={id}
        Schema={PostFormUpdateSchema}
        setImagePreview={setImagePreview}
        title={title}
        content={content}
        submitAction={updatePost}
        toRoute={privateRoutes.postsManage}
      />
    </div>
  );
}
