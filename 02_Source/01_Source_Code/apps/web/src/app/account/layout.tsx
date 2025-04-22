import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { getServerSession } from "../(auth)/_data/get-server-session";

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
    <>
      <Header />
      <main className="width-container">{children}</main>
      <Footer />
    </>
  );
}
