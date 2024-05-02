import HomeCarousel from "@/components/HomeCarousel";
import AdviceForm from "@/components/AdviceForm";
import { PostItemsSide } from "@/components/PostItems";
import { generateCarouselDummy, generatePostDummy } from "@/lib/dummyData";
import Link from "next/link";
import { publicRoutes } from "@/constants/routes";
import { getPosts } from "@/lib/postDb";

export default async function HomePage() {
  const carouselDummy = generateCarouselDummy();
  const posts = await getPosts(true, 4);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <HomeCarousel props={carouselDummy} />
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
        <Link href={publicRoutes.posts} className="text-primary">
          Lihat lainnya &rarr;
        </Link>
      </div>
      <PostItemsSide posts={posts} />
      <AdviceForm />
    </div>
  );
}
