import { PostEditorUpdate } from "@/components/PostEditor";
import { getPostById } from "@/lib/postDb";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id, true);

  if (!post) notFound();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <PostEditorUpdate
        id={post.id}
        imageUrl={post.imageUrl}
        title={post.title}
        content={post.content}
      />
    </div>
  );
}
