"use client";

import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";
import { Home, Mail, MenuIcon, Newspaper, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ComponentPropsWithoutRef, ComponentType, ReactElement } from "react";
import { privateRoutes, publicRoutes } from "@/constants/routes";
import { cn, getRoute } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavBarAuthLinkProps = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive: boolean;
};

function NavBarAuthLink({ Icon, label, href, isActive }: NavBarAuthLinkProps) {
  return (
    <Link
      key={label}
      href={href}
      className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isActive ? "bg-primary text-white" : "hover:text-accent-foreground"
      }`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" /> {label}
    </Link>
  );
}

type NavBarAuthProps = ComponentPropsWithoutRef<"header">["className"];

export default function NavBarAuth({
  className,
}: {
  className: NavBarAuthProps;
}) {
  const pathname = usePathname();
  const currentRoute = getRoute(pathname)[0];

  const routes = [
    {
      Icon: Home,
      label: "Dashboard",
      href: privateRoutes.dashboard,
    },
    {
      Icon: User,
      label: "Pendaftaran",
      href: privateRoutes.registrations,
    },
    {
      Icon: Mail,
      label: "Saran",
      href: privateRoutes.advices,
    },
    {
      Icon: Newspaper,
      label: "Postingan",
      href: publicRoutes.posts,
    },
  ];

  return (
    <header
      className={cn(
        "sticky left-0 top-0 z-50 bg-background shadow-sm md:flex",
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
                {routes.map(({ Icon, label, href }) => {
                  const isActive = "/" + currentRoute === href;

                  return (
                    <NavBarAuthLink
                      key={href}
                      Icon={Icon}
                      label={label}
                      href={href}
                      isActive={isActive}
                    />
                  );
                })}
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
          {routes.map(({ Icon, label, href }) => {
            const isActive = "/" + currentRoute === href;

            return (
              <NavBarAuthLink
                key={href}
                Icon={Icon}
                label={label}
                href={href}
                isActive={isActive}
              />
            );
          })}
          <Separator className="my-4" />
          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
