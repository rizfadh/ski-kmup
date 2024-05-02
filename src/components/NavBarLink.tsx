import Link from "next/link";
import { ComponentType } from "react";

type NavBarLinkProps = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive: boolean;
};

export default function NavBarLink({
  Icon,
  label,
  href,
  isActive,
}: NavBarLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isActive ? "bg-primary text-white" : "hover:text-accent-foreground"
      }`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" /> {label}
    </Link>
  );
}
