import Link from "next/link";

import { Logo } from "@/components/icons/logo";
import { LogoCompact } from "@/components/icons/logo-compact";

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center text-primary">
      <Logo className="hidden md:block" />
      <LogoCompact className="block md:hidden" />
    </Link>
  );
}
