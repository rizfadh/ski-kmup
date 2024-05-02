import { auth } from "@/auth";
import LinkButton from "@/components/LinkButton";
import { PostItems } from "@/components/PostItems";
import { Card, CardContent } from "@/components/ui/card";
import { privateRoutes } from "@/constants/routes";
import { getPosts } from "@/lib/postDb";
import { FileCheck, PlusCircle } from "lucide-react";

function PostsMenu() {
  return (
    <Card className="w-fit">
      <CardContent className="space-x-2 p-2">
        <LinkButton href={privateRoutes.postsNew} variant="ghost" size="icon">
          <PlusCircle className="h-[1.5rem] w-[1.5rem]" />
        </LinkButton>
        <LinkButton href="#" variant="ghost" size="icon">
          <FileCheck className="h-[1.5rem] w-[1.5rem]" />
        </LinkButton>
      </CardContent>
    </Card>
  );
}

export default async function PostsPage() {
  const [posts, session] = await Promise.all([getPosts(true), auth()]);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      {session ? <PostsMenu /> : null}
      <PostItems posts={posts} />
    </div>
  );
}
