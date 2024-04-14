"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type Props = React.ComponentProps<typeof Button>;

export default function BackButton({ className, ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      className={className}
      {...props}
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      aria-label="Go back"
    >
      <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
