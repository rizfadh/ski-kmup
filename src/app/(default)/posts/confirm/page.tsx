import { DataTable } from "@/components/DataTable";
import { postsConfirmColumns } from "@/components/tables/postsColumns";
import { getPosts } from "@/lib/postDb";

export default async function PostsConfirmPage() {
  const posts = await getPosts(false);
  const postsData = posts.map(({ id, createdBy, title, createdAt }) => {
    return {
      id,
      createdBy,
      title,
      createdAt,
    };
  });

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <h2 className="text-2xl font-bold">Konfirmasi Postingan</h2>
      <DataTable columns={postsConfirmColumns} data={postsData} />
    </div>
  );
}
