import Link from "next/link";

import { LogoCompact } from "@/components/icons/logo-compact";

export function HostLogo() {
  return (
    <Link href="/host" className="flex items-center text-airbnb">
      <LogoCompact />
    </Link>
  );
}
