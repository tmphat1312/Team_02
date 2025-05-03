import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function WishlistsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="width-container pb-16 pt-4">{children}</main>
      <Footer />
    </div>
  );
}
