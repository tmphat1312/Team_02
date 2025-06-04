"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HostNavigationLinks = [
  { href: "/host", label: "Listings" },
  { href: "/host/reservations", label: "Reservations" },
  { href: "/host/revenue", label: "Revenue" },
];

export function HostNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 relative translate-x-24">
      {HostNavigationLinks.map((link) => (
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
