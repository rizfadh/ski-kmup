import { auth } from "@/auth";
import PostForm from "@/components/PostForm";

export default async function NewPostPage() {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div className="container my-8 grid grid-cols-1 gap-y-8">
      <PostForm userId={session.user.id as string} />
    </div>
  );
}
