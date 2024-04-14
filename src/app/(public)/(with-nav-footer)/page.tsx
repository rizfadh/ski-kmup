import HomeCarousel from "@/components/HomeCarousel";
import Advice from "@/components/Advice";
import PostItems from "@/components/PostItems";
import { generateCarouselDummy, generatePostDummy } from "@/lib/dummyData";
import Link from "next/link";

export default function HomePage() {
  const carouselDummy = generateCarouselDummy();
  const postDummy = generatePostDummy();

  return (
    <div className="container grid gap-8">
      <HomeCarousel props={carouselDummy} />
      <div className="flex flex-col justify-between md:flex-row">
        <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
        <Link href="/post" className="text-primary">
          Lihat lainnya &rarr;
        </Link>
      </div>
      <PostItems props={postDummy} />
      <Advice />
    </div>
  );
}
