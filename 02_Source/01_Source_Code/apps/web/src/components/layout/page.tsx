"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function Page({ className, ...props }: React.ComponentProps<"main">) {
  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);
  return <main className={cn("pt-8 pb-12 grow", className)} {...props} />;
}
