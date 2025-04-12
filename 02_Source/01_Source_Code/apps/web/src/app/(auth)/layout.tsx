import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mt-16 mb-8 max-w-xl mx-auto rounded-xl border">
        {children}
      </main>
      <Footer />
    </>
  );
}
