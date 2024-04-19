"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { publicRoutes } from "@/constants/routes";

type Props = React.ComponentProps<typeof Button>;

export default function HomeButton({ className, ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      className={className}
      {...props}
      variant="ghost"
      size="icon"
      onClick={() => router.push(publicRoutes.home)}
      aria-label="Go Home"
    >
      <Home className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
