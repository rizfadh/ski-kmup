"use client"

import Link from "next/link"
import { Separator } from "./ui/separator"
import { ModeToggle } from "./ModeToggle"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function NavBar() {
  const router: { label: string; href: string }[] = [
    { label: "Berita", href: "/news" },
    { label: "Login", href: "/login" },
  ]

  const pathname = usePathname()

  return (
    <header className="sticky top-0">
      <nav className="container py-3 backdrop-blur-sm flex justify-between">
        <div className="flex gap-5 items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/ski_icon.svg"
              width={40}
              height={40}
              alt="Beranda SKI-KMUP"
            />
          </Link>
          {router.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={
                pathname === href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <ModeToggle />
      </nav>
      <Separator />
    </header>
  )
}
