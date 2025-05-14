import "@/styles/globals.css";

import { fontClasses } from "@/styles/fonts";

import { meta } from "./meta";
import { Providers } from "./providers";

export const metadata = meta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
