import { auth } from "@/auth";
import LinkButton from "@/components/LinkButton";
import { PostItems } from "@/components/PostItems";
import { privateRoutes } from "@/constants/routes";
import { getPosts } from "@/lib/postDb";
import { PlusCircle, ListChecks } from "lucide-react";

function PostsMenu() {
  return (
    <div className="flex gap-2">
      <LinkButton
        href={privateRoutes.postsNew}
        variant="outline"
        className="flex items-center gap-2"
      >
        Buat <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
      </LinkButton>
      <LinkButton
        href={privateRoutes.postsManage}
        variant="outline"
        className="flex items-center gap-2"
      >
        Atur <ListChecks className="h-[1.5rem] w-[1.5rem]" />
      </LinkButton>
    </div>
  );
}

export default async function PostsPage() {
  const [posts, session] = await Promise.all([getPosts(true), auth()]);
  const isLoggedIn = !session || !session.user;
  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      {isLoggedIn ? null : <PostsMenu />}
      <PostItems posts={posts} />
    </div>
  );
}
