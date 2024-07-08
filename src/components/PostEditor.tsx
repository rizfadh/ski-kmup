"use client";

import { useState } from "react";
import Image from "next/image";
import imageEmpty from "../../public/add-image.svg";
import { PostFormNew, PostFormUpdate } from "./PostForm";

export function PostEditorNew() {
  const [imagePreview, setImagePreview] = useState<String>();

  return (
    <div className="prose prose-sm mx-auto w-full dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
      <Image
        src={imagePreview ? imagePreview : imageEmpty}
        width="1024"
        height="576"
        alt="Image preview"
        className="not-prose mb-4 rounded-md shadow-md"
        priority
      />
      <PostFormNew setImagePreview={setImagePreview} />
    </div>
  );
}

type PostEditorUpdateProps = {
  id: string;
  imageUrl: string;
  title: string;
  content: string;
};

export function PostEditorUpdate({
  id,
  imageUrl,
  title,
  content,
}: PostEditorUpdateProps) {
  const [imagePreview, setImagePreview] = useState<String>(imageUrl);

  return (
    <div className="prose prose-sm mx-auto w-full dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
      <Image
        src={imagePreview ? imagePreview : imageEmpty}
        width="1024"
        height="576"
        alt="Image preview"
        className="not-prose mb-4 h-auto w-full rounded-md shadow-md"
        priority
      />
      <PostFormUpdate
        id={id}
        setImagePreview={setImagePreview}
        title={title}
        content={content}
      />
    </div>
  );
}
