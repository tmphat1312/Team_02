import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mb-4">{children}</main>
      <Footer />
    </>
  );
}
