import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

type Props = {
  id: number;
  img: string;
  title: string;
  date: string;
  author: string;
};

export default function PostItems({ props }: { props: Props[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {props.map(({ id, img, title, date, author }) => (
        <Link key={id} href="#">
          <Card className="h-full transition-all hover:rotate-2 hover:shadow-lg">
            <CardHeader className="relative h-[200px] w-full p-0">
              <Image
                src={img}
                alt="title"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33.3vw, 25vw"
                className="h-auto w-full rounded-t-md object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-primary">{author}</p>
                <p className="line-clamp-2 font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
