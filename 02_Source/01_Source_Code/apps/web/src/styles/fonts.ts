import { Figtree } from "next/font/google";

import { cn } from "@/lib/utils";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const fontClasses = cn(
  figtree.variable,
  figtree.className,
  "antialiased"
);
