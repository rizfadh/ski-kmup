import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

type Props = {
  img: string
  title: string
  description: string
}

export default function HomeCarousel({ props }: { props: Props[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {props.map(({ img, title, description }, index) => (
          <CarouselItem key={index}>
            <div className="h-[500px] relative rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`Carousel-${title}`}
                fill
                sizes="100vw"
                priority
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-80%"></div>
              <div className="absolute self-end inset-0 md:w-3/4 place-content-center p-10 text-primary-foreground">
                <p className="text-4xl font-bold line-clamp-2">{title}</p>
                <p className="mt-3 line-clamp-3">{description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
