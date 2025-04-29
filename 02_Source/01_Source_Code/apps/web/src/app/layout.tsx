import "@/styles/globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { fontClasses } from "@/styles/fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rento | Vacation rentals",
  description: "Find your perfect vacation rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontClasses}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster richColors />
      </body>
    </html>
  );
}
