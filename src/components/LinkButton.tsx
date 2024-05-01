import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props
  extends ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {}

export default function LinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: Props) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
