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
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ComponentType } from "react";
import { authRoutes, publicRoutes } from "@/constants/routes";
import { getRoute } from "@/lib/utils";

export default function NavBar() {
  const routes: {
    Icon: ComponentType<{ className?: string }>;
    label: string;
    href: string;
  }[] = [
    {
      Icon: HomeIcon,
      label: "Home",
      href: publicRoutes.home,
    },
    {
      Icon: NewspaperIcon,
      label: "Post",
      href: publicRoutes.posts,
    },
    {
      Icon: BookUserIcon,
      label: "Tentang",
      href: publicRoutes.about,
    },
    {
      Icon: LogInIcon,
      label: "Login",
      href: authRoutes.login,
    },
  ];

  const pathname = usePathname();
  const currentRoute = getRoute(pathname)[0];

  return (
    <header className="sticky top-0 z-50 bg-background">
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
                {routes.map(({ Icon, label, href }) => {
                  const isActive = "/" + currentRoute === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-5 ${
                        isActive
                          ? "text-primary"
                          : "text-foreground hover:text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-[1.2rem] w-[1.2rem]" /> {label}
                    </Link>
                  );
                })}
                <Separator />
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:container md:flex md:flex-grow md:items-center md:justify-between md:py-3">
          <h1 className="font-black text-primary">SKI-KMUP</h1>
          <div className="flex items-center gap-5">
            {routes.map(({ label, href }) => {
              const isActive = "/" + currentRoute === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-muted-foreground"
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <ModeToggle />
        </div>
      </nav>
      <Separator />
    </header>
  );
}
