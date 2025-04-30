"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HOST_NAVIGATION_LINKS = [
  { href: "/host", label: "Today" },
  { href: "/host/listings", label: "Listings" },
  { href: "/host/reservations", label: "Reservations" },
  { href: "/host/messages", label: "Messages" },
];

  export function HostNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {HOST_NAVIGATION_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "py-2 text-sm font-medium border-b-2",
            link.href === pathname
              ? "border-secondary"
              : "border-transparent text-gray-500 hover:text-current"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
