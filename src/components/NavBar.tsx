"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import {
  BookUserIcon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  NewspaperIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactElement } from "react";

export default function NavBar() {
  const router: { icon: ReactElement; label: string; href: string }[] = [
    {
      icon: <HomeIcon className="h-[1.2rem] w-[1.2rem]" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <NewspaperIcon className="h-[1.2rem] w-[1.2rem]" />,
      label: "Post",
      href: "/post",
    },
    {
      icon: <BookUserIcon className="h-[1.2rem] w-[1.2rem]" />,
      label: "Tentang",
      href: "/about",
    },
    {
      icon: <LogInIcon className="h-[1.2rem] w-[1.2rem]" />,
      label: "Login",
      href: "/login",
    },
  ];

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 mb-8 bg-background">
      <nav>
        <div className="container flex items-center justify-between py-3 md:hidden">
          <h1 className="font-black text-primary">SKI-KMUP</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-5 flex flex-col gap-5">
                {router.map(({ icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`flex items-center gap-5 ${
                      pathname === href
                        ? "text-primary"
                        : "text-foreground hover:text-muted-foreground"
                    }`}
                  >
                    {icon} {label}
                  </Link>
                ))}
                <Separator />
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:container md:flex md:flex-grow md:items-center md:justify-between md:py-3">
          <h1 className="font-black text-primary">SKI-KMUP</h1>
          <div className="flex items-center gap-5">
            {router.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={
                  pathname === href
                    ? "text-primary"
                    : "text-foreground hover:text-muted-foreground"
                }
              >
                {label}
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
      </nav>
      <Separator />
    </header>
  );
}
