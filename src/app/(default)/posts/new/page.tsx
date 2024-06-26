import PostEditor from "@/components/PostEditor";
import getSession from "@/lib/getSession";

export default async function NewPostPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <PostEditor type="NEW" id={session.user.id as string} />
    </div>
  );
}
