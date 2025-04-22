import { Header } from "@/components/layout/header";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr]">
      <Header />
      <main className="">{children}</main>
    </div>
  );
}
