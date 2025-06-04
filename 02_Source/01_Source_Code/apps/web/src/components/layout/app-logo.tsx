import logoWithoutText from "@/assets/logo-without-slogan.png";
import Link from "next/link";

import Image from "next/image";

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center text-primary">
      <Image
        src={logoWithoutText}
        alt="Logo without text"
        className="hidden md:block w-auto h-10"
        width={545}
        height={172}
      />
    </Link>
  );
}
