import { aboutImage } from "@/constants/imageData";
import Image from "next/image";
import shipSvg from "../../../../public/shipSvg.svg";

export default function AboutPage() {
  return (
    <div className="container my-10 grid grid-cols-1 gap-y-10">
      <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-start">
        <div className="order-last max-w-[700px] space-y-4 lg:order-first">
          <p className="text-2xl tracking-widest lg:text-3xl">ABOUT US</p>
          <h1 className="text-3xl font-bold lg:text-5xl">
            Satuan Kegiatan Islam, <br /> Bersatu{" "}
            <span className="text-primary underline">Dalam Islam</span>
          </h1>
          <p className="text-justify lg:text-start">
            SKI-KMUP (Satuan Kegiatan Islam - Keluarga Mahasiswa Universitas
            Pancasila) adalah sebuah UKM dibawah naungan SENAT Universitas
            Pancasila yang dikelola langsung oleh Bidang III Senat
            (Kesejahteraan Masyarakat). SKI-KMUP merupakan UKM yang bergerak
            dalam bidang Rohani Islam (ROHIS) atau biasa disebut Lembaga Dakwah
            Kampus (LDK).
          </p>
        </div>
        <div
          className="relative h-[250px] w-[250px]"
          style={{ boxShadow: `-15px 15px #16a34a` }}
        >
          <Image
            src={aboutImage}
            alt="about image"
            fill
            sizes="(max-width: 1024px) 100vw, 20vw"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center gap-4 lg:grid-cols-3">
        <div className="rounded-md border-2 border-primary p-12 text-center">
          <h2 className="text-2xl font-bold lg:text-3xl">Divisi</h2>
          <p>Memiliki 6 Divisi</p>
        </div>
        <div className="rounded-md border-2 border-primary p-12 text-center">
          <h2 className="text-2xl font-bold lg:text-3xl">Pusat</h2>
          <p>Menaungi 7 Rohis Fakultas</p>
        </div>
        <div className="rounded-md border-2 border-primary p-12 text-center">
          <h2 className="text-2xl font-bold lg:text-3xl">Berdiri</h2>
          <p>Didirikan pada tahun 1404H/1984M</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <p className="text-2xl tracking-widest lg:text-3xl">OUR HISTORY</p>
        <h2 className="text-3xl font-bold lg:text-5xl">Sejarah SKI-KMUP</h2>
        <p className="mt-4 max-w-[800px]">
          SKI-KMUP didirikan pada tahun 1984 M/1404 H untuk jangka waktu yang
          tidak ditentukan. Organisasi ini merupakan kelanjutan dari Pusat Studi
          Islam Universitas Pancasila yang didirikan pada tahun 1981 M/1401 H.
          Tujuannya adalah untuk menjadi wadah komunikasi dan pengembangan bagi
          mahasiswa muslim Universitas Pancasila.
        </p>
        <Image src={shipSvg} alt="ship" className="mt-8" />
      </div>
    </div>
  );
}
