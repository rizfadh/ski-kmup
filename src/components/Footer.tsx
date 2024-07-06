import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { ReactElement } from "react";

export default function Footer() {
  const socialMedia: { icon: ReactElement; lable: string; href: string }[] = [
    {
      icon: <Facebook className="h-[2rem] w-[2rem]" />,
      lable: "Facebook",
      href: "https://www.facebook.com/satuankegiatanislam.up",
    },
    {
      icon: <Instagram className="h-[2rem] w-[2rem]" />,
      lable: "Instagram",
      href: "https://www.instagram.com/ski_kmup",
    },
    {
      icon: <Twitter className="h-[2rem] w-[2rem]" />,
      lable: "Twitter",
      href: "https://x.com/SKI_KMUP",
    },
    {
      icon: <Youtube className="h-[2rem] w-[2rem]" />,
      lable: "Youtube",
      href: "https://youtube.com/@satuankegiatanislamunivers4384",
    },
  ];

  return (
    <footer className="container mb-4">
      <div className="rounded-lg bg-primary text-primary-foreground lg:rounded-2xl">
        <div className="grid gap-y-5 p-5 lg:grid-cols-2 lg:p-10">
          <div className="grid">
            <h3 className="text-center text-xl font-bold">Tentang Kami</h3>
            <div className="mt-5 grid items-center gap-3 lg:mt-0">
              <h4 className="text-center text-lg font-medium">Alamat</h4>
              <p>
                Pusat Kegiatan Mahasiswa Universitas Pancasila RT.5/RW.5,
                Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah
                Khusus Ibukota Jakarta 12630
              </p>
              <h4 className="text-center text-lg font-medium">Ikuti kami di</h4>
              <div className="flex justify-center gap-3">
                {socialMedia.map(({ icon, lable, href }) => (
                  <Link
                    key={lable}
                    href={href}
                    aria-label={lable}
                    className="flex h-[3rem] w-[3rem] rotate-0 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-all hover:rotate-45 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
              <h4 className="text-center text-lg font-medium">
                Hubungi kami di
              </h4>
              <Link
                href="mailto:ldkskiup@gmail.com"
                className="flex justify-center gap-3"
              >
                <Mail />
                ldkskiup@gmail.com
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-center text-xl font-bold">Maps</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.83941391364402!2d106.83245221462734!3d-6.338229177735141!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edb3ed58680d%3A0x990525d601e1201d!2sUKM%20satuan%20kegiatan%20islam%20SKI-KMUP!5e0!3m2!1sid!2sid!4v1712954742616!5m2!1sid!2sid"
              className="mt-5 w-full rounded-md shadow-sm"
              height="300"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <Separator />
        <div className="py-4">
          <p className="text-center">
            Copyright &copy; SKI-KMUP {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
