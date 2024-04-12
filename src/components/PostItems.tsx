import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

type Props = {
  id: number
  img: string
  title: string
  date: string
  author: string
}

export default function PostItems({ props }: { props: Props[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {props.map(({ id, img, title, date, author }) => (
        <Link key={id} href="#">
          <Card>
            <CardHeader className="p-0 relative w-full h-[200px]">
              <Image
                src={img}
                alt="title"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33.3vw, 25vw"
                className="w-full h-auto object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-primary">{author}</p>
              <p className="line-clamp-1 font-medium">{title}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">{date}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
