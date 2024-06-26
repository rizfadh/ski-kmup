import { PostLike, PostLikeButton } from "@/components/PostLike";
import { Separator } from "@/components/ui/separator";
import { dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getPostById, getPostLikesById, isLikedByUser } from "@/lib/postDb";
import parse from "html-react-parser";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, session, postLikes] = await Promise.all([
    getPostById(params.id, true),
    getSession(),
    getPostLikesById(params.id),
  ]);

  if (!post) notFound();

  if (!session || !session.user)
    return (
      <div className="container my-4 grid grid-cols-1 gap-y-4">
        <div className="prose prose-sm mx-auto w-full dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
          <Image
            src={post.imageUrl}
            width="1024"
            height="576"
            alt={post.title}
            className="rounded-md shadow-md"
            priority
          />
          <h1>{post.title}</h1>
          <div className="not-prose">
            <div className="text-sm text-muted-foreground lg:text-base">
              <p className="font-bold text-primary">{post.user.name}</p>
              <p>{dateFormat(post.createdAt)}</p>
            </div>
            <Separator className="my-2" />
            <PostLike likes={postLikes.likes} dislikes={postLikes.dislikes} />
          </div>
          {parse(post.content)}
        </div>
      </div>
    );

  const isLiked = await isLikedByUser(session.user.id as string, params.id);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="prose prose-sm mx-auto w-full dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Image
          src={post.imageUrl}
          width="1024"
          height="576"
          alt={post.title}
          className="rounded-md shadow-md"
          priority
        />
        <h1>{post.title}</h1>
        <div className="not-prose">
          <div className="text-sm text-muted-foreground lg:text-base">
            <p className="font-bold text-primary">{post.user.name}</p>
            <p>{dateFormat(post.createdAt)}</p>
          </div>
          <Separator className="my-2" />
          <PostLikeButton
            isLiked={isLiked}
            likes={postLikes.likes}
            dislikes={postLikes.dislikes}
            userId={session.user.id as string}
            postId={post.id}
          />
        </div>
        {parse(post.content)}
      </div>
    </div>
  );
}
