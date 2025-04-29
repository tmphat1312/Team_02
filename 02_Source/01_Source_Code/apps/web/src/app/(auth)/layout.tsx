import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { getServerSession } from "./_data/get-server-session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (session && session.user) {
    return redirect("/");
  }

  return (
    <>
      <Header />
      <main className="my-16 max-w-lg mx-auto rounded-xl border">
        {children}
      </main>
      <Footer />
    </>
  );
}
