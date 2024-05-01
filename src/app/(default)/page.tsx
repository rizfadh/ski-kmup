import HomeCarousel from "@/components/HomeCarousel";
import AdviceForm from "@/components/AdviceForm";
import PostItems from "@/components/PostItems";
import { generateCarouselDummy, generatePostDummy } from "@/lib/dummyData";
import Link from "next/link";
import { publicRoutes } from "@/constants/routes";

export default function HomePage() {
  const carouselDummy = generateCarouselDummy();
  const postDummy = generatePostDummy();

  return (
    <div className="container my-8 grid grid-cols-1 gap-y-8">
      <HomeCarousel props={carouselDummy} />
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
        <Link href={publicRoutes.posts} className="text-primary">
          Lihat lainnya &rarr;
        </Link>
      </div>
      <PostItems props={postDummy} />
      <AdviceForm />
    </div>
  );
}
