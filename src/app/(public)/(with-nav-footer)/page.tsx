import HomeCarousel from "@/components/HomeCarousel";
import AdviceForm from "@/components/AdviceForm";
import PostItems from "@/components/PostItems";
import { generateCarouselDummy, generatePostDummy } from "@/lib/dummyData";

export default function HomePage() {
  const carouselDummy = generateCarouselDummy();
  const postDummy = generatePostDummy();

  return (
    <div className="container mt-8 grid grid-cols-1 gap-y-8">
      <HomeCarousel props={carouselDummy} />
      <PostItems props={postDummy} />
      <AdviceForm />
    </div>
  );
}
