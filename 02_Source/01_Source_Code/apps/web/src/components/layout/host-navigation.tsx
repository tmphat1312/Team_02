import Link from "next/link";

export function HostNavigation() {
  return (
    <nav className="flex items-center gap-6">
      <Link
        href="/host"
        className="border-b-2 border-black py-2 text-sm font-medium"
      >
        Today
      </Link>

      <Link
        href="/host/listings"
        className="py-2 text-sm font-medium text-gray-500 hover:text-black"
      >
        Listings
      </Link>
      <Link
        href="/host/messages"
        className="py-2 text-sm font-medium text-gray-500 hover:text-black"
      >
        Messages
      </Link>
    </nav>
  );
}
