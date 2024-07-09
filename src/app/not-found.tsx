import LinkButton from "@/components/LinkButton";
import { publicRoutes } from "@/constants/routes";
import Image from "next/image";
import notFoundSvg from "../../public/notFoundSvg.svg";

export default function NotFound() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center text-center">
      <Image
        src={notFoundSvg}
        alt="error"
        className="w-full max-w-[300px]"
        priority
      />
      <p className="mt-4">Not Found</p>
      <h2 className="text-4xl font-black">Tidak Ditemukan</h2>
      <LinkButton href={publicRoutes.home} className="mt-4" variant="outline">
        Home
      </LinkButton>
    </div>
  );
}
