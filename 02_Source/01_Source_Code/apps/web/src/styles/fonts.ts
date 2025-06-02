import { Nunito } from "next/font/google";

import { cn } from "@/lib/utils";

const nutito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const fontClasses = cn(nutito.variable, nutito.className, "antialiased");
