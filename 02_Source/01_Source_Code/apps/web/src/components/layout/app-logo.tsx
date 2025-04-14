import type { LinkProps } from "next/link";
import Link from "next/link";

import { Logo } from "@/components/icons/logo";
import { LogoCompact } from "@/components/icons/logo-compact";
import { cn } from "@/lib/utils";

type LinksPropsWithOptionalHref = Omit<LinkProps, "href"> & { href?: string };
type Props = LinksPropsWithOptionalHref & React.ComponentProps<"a">;

export function AppLogo(props: Props) {
  const { className, href = "/", ...rest } = props;
  return (
    <Link
      href={href}
      className={cn("flex items-center text-airbnb", className)}
      {...rest}
    >
      <Logo className="hidden md:block" />
      <LogoCompact className="block md:hidden" />
    </Link>
  );
}
