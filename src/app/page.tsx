import Image from "next/image"

export default function Home() {
  return (
    <main className="container">
      <div className="flex items-center mt-[5rem]">
        <div className="basis-1/2">
          <h1 className="text-7xl font-black text-primary">SKI-KMUP</h1>
          <p>Satuan Kegiatan Islam Keluarga Mahasiswa Universitas Pancasila</p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            voluptatibus culpa ipsum dicta est dolore voluptates quae sed beatae
            deserunt.
          </p>
        </div>
        <div className="flex-grow">
          <Image
            src="/logo-ski.png"
            width={200}
            height={200}
            alt="logo"
            className="size-[27rem] m-auto"
          />
        </div>
      </div>
    </main>
  )
}
