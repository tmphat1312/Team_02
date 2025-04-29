import { redirect } from "next/navigation";

import { getServerSession } from "@/app/(auth)/_data/get-server-session";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="width-container py-8 grid place-content-center mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
