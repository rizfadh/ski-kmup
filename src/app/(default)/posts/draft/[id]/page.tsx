import { Separator } from "@/components/ui/separator";
import { dateFormat } from "@/lib/dateFormatter";
import { getPostById } from "@/lib/postDb";
import parse from "html-react-parser";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostDraftDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id, false);

  if (!post) notFound();

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
        </div>
        {parse(post.content)}
      </div>
    </div>
  );
}
