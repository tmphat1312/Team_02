import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header containerType="narrow" />
      <main className="mb-4">{children}</main>
      <Footer containerStyle="narrow" />
    </>
  );
}
