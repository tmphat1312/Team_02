import type { LinkProps } from "next/link";
import Link from "next/link";

import { LogoCompact } from "@/components/icons/logo-compact";
import { cn } from "@/lib/utils";

type LinksPropsWithOptionalHref = Omit<LinkProps, "href"> & { href?: string };
type Props = LinksPropsWithOptionalHref & React.ComponentProps<"a">;

export function HostLogo(props: Props) {
  const { className, href = "/host", ...rest } = props;
  return (
    <Link
      href={href}
      className={cn("flex items-center text-airbnb", className)}
      {...rest}
    >
      <LogoCompact />
    </Link>
  );
}
