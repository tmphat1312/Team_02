"use client";

import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";
import { useUser } from "@/app/(auth)/_hooks/use-user";
import { Skeleton } from "../ui/skeleton";

type LinksPropsWithOptionalHref = Omit<LinkProps, "href"> & { href?: string };
type Props = LinksPropsWithOptionalHref & React.ComponentProps<"a">;

export function ToHostButton(props: Props) {
  const { className, href = "/host", ...rest } = props;
  const { isLoading, isHost } = useUser();
  const linkText = isHost ? "Switch to hosting" : "Airbnb your home";

  if (isLoading) {
    return <Skeleton className="h-8 w-32 rounded-full" />;
  }

  return (
    <Link
      href={href}
      className={cn(
        `hidden md:flex items-center px-4 py-2.5 rounded-full`,
        "text-sm hover:bg-accent font-medium",
        className
      )}
      {...rest}
    >
      {linkText}
    </Link>
  );
}
