"use client";

import { useState } from "react";
import PostForm from "./PostForm";
import Image from "next/image";
import imageEmpty from "../../public/add-image.svg";

type Props = {
  userId: string;
};

export default function PostEditor({ userId }: Props) {
  const [imagePreview, setImagePreview] = useState<File>();

  return (
    <div className="prose prose-sm mx-auto dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
      <Image
        src={imagePreview ? URL.createObjectURL(imagePreview) : imageEmpty}
        width="1024"
        height="576"
        alt="Image preview"
        className="not-prose mb-4 h-auto w-full rounded-md shadow-md"
        priority
      />
      <PostForm userId={userId} setImagePreview={setImagePreview} />
    </div>
  );
}
