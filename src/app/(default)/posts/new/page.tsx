import { PostEditorNew } from "@/components/PostEditor";
import getSession from "@/lib/getSession";

export default async function NewPostPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <PostEditorNew />
    </div>
  );
}
