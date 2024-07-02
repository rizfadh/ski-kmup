import LinkButton from "@/components/LinkButton";
import { PostItems } from "@/components/PostItems";
import { privateRoutes } from "@/constants/routes";
import getSession from "@/lib/getSession";
import { getMostLikedPosts, getPosts } from "@/lib/postDb";
import { UserRole } from "@prisma/client";
import { PlusCircle, ListChecks } from "lucide-react";

function PostsMenu({ role }: { role: UserRole }) {
  return (
    <div className="flex gap-2">
      <LinkButton
        href={privateRoutes.postsNew}
        variant="outline"
        className="flex items-center gap-2"
      >
        Buat <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
      </LinkButton>
      {role === "HEADOFMEDCEN" && (
        <LinkButton
          href={privateRoutes.postsManage}
          variant="outline"
          className="flex items-center gap-2"
        >
          Kelola <ListChecks className="h-[1.5rem] w-[1.5rem]" />
        </LinkButton>
      )}
    </div>
  );
}

export default async function PostsPage() {
  const [posts, favoritePosts, session] = await Promise.all([
    getPosts(true),
    getMostLikedPosts(),
    getSession(),
  ]);
  const isLoggedIn = !session || !session.user;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      {isLoggedIn ? null : <PostsMenu role={session.user.role} />}
      <h2 className="text-2xl font-bold">Postingan Favorit</h2>
      <PostItems posts={favoritePosts} />
      <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
      <PostItems posts={posts} />
    </div>
  );
}
