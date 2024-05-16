import { DataTable } from "@/components/DataTable";
import {
  postsConfirmColumns,
  postsManageColumns,
} from "@/components/tables/postsColumns";
import { getPosts } from "@/lib/postDb";

export default async function PostsManagePage() {
  const posts = await getPosts(true);
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
      <DataTable columns={postsManageColumns} data={postsData} />
    </div>
  );
}
