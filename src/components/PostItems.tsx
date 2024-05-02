import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { dateFormat } from "@/lib/dateFormatter";
import { publicRoutes } from "@/constants/routes";

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: Date;
  createdBy: string;
};

export function PostItems({ posts }: { posts: Props[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {posts.map(({ id, imageUrl: img, title, createdAt, createdBy }) => (
        <Link key={id} href={publicRoutes.postDetail(id)}>
          <Card className="h-full transition-all hover:rotate-1 hover:shadow-md">
            <CardHeader className="relative h-[200px] w-full p-0">
              <Image
                src={img}
                alt="title"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33.3vw, 25vw"
                className="h-auto w-full rounded-t-md object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-primary">{createdBy}</p>
                <p className="line-clamp-2 font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">
                  {dateFormat(createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function PostItemsSide({ posts }: { posts: Props[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {posts.map(({ id, imageUrl: img, title, createdAt, createdBy }) => (
        <Link key={id} href={publicRoutes.postDetail(id)}>
          <Card className="h-full overflow-hidden">
            <CardContent className="h-full p-0">
              <div className="flex h-full">
                <div className="relative basis-[150px]">
                  <Image
                    src={img}
                    alt="title"
                    fill
                    sizes="25vw"
                    className="h-full w-auto object-cover"
                  />
                </div>
                <div className="flex-grow basis-[20ch] space-y-2 p-4">
                  <p className="text-primary">{createdBy}</p>
                  <p className="line-clamp-2 font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">
                    {dateFormat(createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
