import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { authClient } from "@/lib/auth-client";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { data } = await authClient.getSession(undefined, {
    headers: headersList,
  });

  if (data && data.user) {
    return redirect("/");
  }

  return (
    <>
      <Header />
      <main className="my-16 max-w-xl mx-auto rounded-xl border">
        {children}
      </main>
      <Footer />
    </>
  );
}
