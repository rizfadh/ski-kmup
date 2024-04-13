import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

type Props = {
  img: string;
  title: string;
  description: string;
};

export default function HomeCarousel({ props }: { props: Props[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {props.map(({ img, title, description }, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[500px] overflow-hidden rounded-lg">
              <Image
                src={img}
                alt={`Carousel-${title}`}
                fill
                sizes="100vw"
                priority
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-80%"></div>
              <div className="absolute inset-0 place-content-center self-end p-10 text-primary-foreground md:w-3/4">
                <p className="line-clamp-2 text-4xl font-bold">{title}</p>
                <p className="mt-3 line-clamp-3">{description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
