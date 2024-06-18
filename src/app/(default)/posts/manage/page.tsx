import { DataTable } from "@/components/DataTable";
import {
  confirmColumns,
  manageColumns,
} from "@/components/tables/postsColumns";
import { getPosts } from "@/lib/postDb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function PostsManagePage() {
  const [postsedPosts, waitingPosts] = await Promise.all([
    getPosts(true),
    getPosts(false),
  ]);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <Tabs defaultValue="posted">
        <TabsList>
          <TabsTrigger value="posted">Diposting</TabsTrigger>
          <TabsTrigger value="waiting">Menunggu</TabsTrigger>
        </TabsList>
        <TabsContent value="posted">
          <DataTable
            columns={manageColumns}
            data={postsedPosts}
            searchBy="title"
            searchPlaceholder="Judul"
          />
        </TabsContent>
        <TabsContent value="waiting">
          <DataTable
            columns={confirmColumns}
            data={waitingPosts}
            searchBy="title"
            searchPlaceholder="Judul"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
