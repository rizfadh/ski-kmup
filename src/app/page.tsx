import HomeCarousel from "@/components/HomeCarousel"
import PostItems from "@/components/PostItems"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const carouselDummy = [
    {
      img: "https://images.unsplash.com/photo-1712238645781-c4d9dbbe9b88?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Satuan Kegiatan Islam Keluarga Mahasiswa Universitas Pancasila",
      description:
        "Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam",
    },
    {
      img: "https://images.unsplash.com/photo-1712238645781-c4d9dbbe9b88?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem Ipsum 2",
      description: "Lorem Ipsum Dolor Sit Amet",
    },
    {
      img: "https://images.unsplash.com/photo-1712238645781-c4d9dbbe9b88?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem Ipsum 3",
      description: "Lorem Ipsum Dolor Sit Amet",
    },
  ]

  const postDummy = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1712743072516-13b19bc38840?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Satuan Kegiatan Islam Keluarga Mahasiswa Universitas Pancasila",
      description:
        "Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam",
      date: "2022-01-01",
      author: "John Doe",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1706464377765-6cea01288348?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem Ipsum 2",
      description: "Lorem Ipsum Dolor Sit Amet",
      date: "2022-01-01",
      author: "John Doe",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1712759133177-0b60a8abd756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem Ipsum 3",
      description: "Lorem Ipsum Dolor Sit Amet",
      date: "2022-01-01",
      author: "John Doe",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1711509423975-69f05caf460d?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem Ipsum 4",
      description: "Lorem Ipsum Dolor Sit Amet",
      date: "2022-01-01",
      author: "John Doe",
    },
  ]

  return (
    <main className="container">
      <div className="mt-8 grid gap-8">
        <HomeCarousel props={carouselDummy} />
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="font-bold text-2xl">Postingan Terbaru</h2>
          <Link href="/post" className="text-primary underline">
            Lihat Lainnya
          </Link>
        </div>
        <PostItems props={postDummy} />
      </div>
    </main>
  )
}
