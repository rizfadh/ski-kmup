"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { MenuIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactElement } from "react";
import { privateRoutes } from "@/constants/routes";
import LogoutButton from "./LogoutButton";

export default function NavBarAuth() {
  const routes: { icon: ReactElement; label: string; href: string }[] = [
    {
      icon: <User className="h-[1.2rem] w-[1.2rem]" />,
      label: "Dashboard",
      href: privateRoutes.dashboard,
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
                {routes.map(({ icon, label, href }) => (
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
            {routes.map(({ label, href }) => (
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