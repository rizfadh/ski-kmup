"use client";

import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";
import { Home, MenuIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ComponentPropsWithoutRef, ReactElement } from "react";
import { privateRoutes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavBarAuthLinkProps = {
  icon: ReactElement;
  label: string;
  href: string;
};

function NavBarAuthLink({ icon, label, href }: NavBarAuthLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      key={label}
      href={href}
      className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        pathname === href
          ? "bg-primary text-white"
          : "hover:text-accent-foreground"
      }`}
    >
      {icon} {label}
    </Link>
  );
}

type NavBarAuthProps = ComponentPropsWithoutRef<"header">["className"];

export default function NavBarAuth({
  className,
}: {
  className: NavBarAuthProps;
}) {
  const routes: { icon: ReactElement; label: string; href: string }[] = [
    {
      icon: <Home className="h-[1.2rem] w-[1.2rem]" />,
      label: "Dashboard",
      href: privateRoutes.dashboard,
    },
    {
      icon: <User className="h-[1.2rem] w-[1.2rem]" />,
      label: "Pendaftaran",
      href: privateRoutes.registration,
    },
  ];

  return (
    <header
      className={cn(
        "sticky left-0 top-0 bg-background shadow-sm md:flex",
        className,
      )}
    >
      <nav className="w-full px-4">
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
              <div className="mt-4 flex flex-col">
                {routes.map(({ icon, label, href }) =>
                  NavBarAuthLink({ icon, label, href }),
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-center">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mt-4 hidden grid-cols-1 md:grid">
          <p className="mb-4 text-center font-bold">Menu</p>
          {routes.map(({ icon, label, href }) =>
            NavBarAuthLink({ icon, label, href }),
          )}
          <Separator className="my-4" />
          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
