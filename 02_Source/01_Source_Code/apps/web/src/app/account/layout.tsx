import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { authClient } from "@/lib/auth-client";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { data } = await authClient.getSession(undefined, {
    headers: headersList,
  });

  if (!data) {
    return redirect("/sign-in");
  }

  return (
    <>
      <Header />
      <main className="p-12">{children}</main>
      <Footer />
    </>
  );
}
