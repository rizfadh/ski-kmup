"use client";

import Image from "next/image";
import errorSvg from "../../public/errorSvg.svg";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center text-center">
      <Image
        src={errorSvg}
        alt="error"
        className="w-full max-w-[300px]"
        priority
      />
      <p className="mt-4">Oopss...</p>
      <h2 className="text-4xl font-black">Terjadi Kesalahan</h2>
      <Button className="mt-4" variant="outline" onClick={() => reset()}>
        Coba lagi
      </Button>
    </div>
  );
}
