"use client";

import { useTransition } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { dislikePost, likePost } from "@/actions/postsAction";
import { toast } from "./ui/use-toast";

type PostLikeButtonProps = {
  isLiked?: boolean;
  likes: number;
  dislikes: number;
  userId: string;
  postId: string;
};

export function PostLikeButton({
  isLiked,
  likes,
  dislikes,
  userId,
  postId,
}: PostLikeButtonProps) {
  const [isPending, setTransition] = useTransition();

  const likePostHandler = () => {
    setTransition(async () => {
      const response = await likePost(userId, postId);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  const dislikePostHandler = () => {
    setTransition(async () => {
      const response = await dislikePost(userId, postId);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <p>{likes}</p>
      <Toggle
        pressed={isLiked === true}
        onPressedChange={likePostHandler}
        disabled={isPending}
      >
        <ThumbsUp className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <p>{dislikes}</p>
      <Toggle
        pressed={isLiked !== undefined && isLiked === false}
        onPressedChange={dislikePostHandler}
        disabled={isPending}
      >
        <ThumbsDown className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
    </div>
  );
}

type PostLikeProps = {
  likes: number;
  dislikes: number;
};

export function PostLike({ likes, dislikes }: PostLikeProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <p>{likes}</p>
      <Toggle disabled>
        <ThumbsUp className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <p>{dislikes}</p>
      <Toggle disabled>
        <ThumbsDown className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
    </div>
  );
}
