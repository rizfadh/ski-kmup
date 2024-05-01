import { Card, CardContent } from "@/components/ui/card";
import { dateFormat } from "@/lib/dateFormatter";
import { getPostById } from "@/lib/postDb";
import parse from "html-react-parser";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id);

  if (!post) notFound();

  return (
    <div className="container my-8 grid grid-cols-1 gap-y-8">
      <div className="prose prose-sm mx-auto dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Image
          src={post.imageUrl}
          width="1024"
          height="576"
          alt={post.title}
          className="h-auto w-full rounded-md shadow-md"
          priority
        />
        <h1>{post.title}</h1>
        <div className="not-prose">
          <Card className="w-fit">
            <CardContent className="flex gap-5 px-5 py-3 text-sm text-muted-foreground lg:text-base">
              <p>{post.user.name}</p>
              <span>&bull;</span>
              <p>{dateFormat(post.createdAt)}</p>
            </CardContent>
          </Card>
        </div>
        {parse(post.content)}
      </div>
    </div>
  );
}
