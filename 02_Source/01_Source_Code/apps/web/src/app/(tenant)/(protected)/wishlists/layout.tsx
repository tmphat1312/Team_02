import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function WishlistsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="width-container">{children}</main>
      <Footer />
    </div>
  );
}
