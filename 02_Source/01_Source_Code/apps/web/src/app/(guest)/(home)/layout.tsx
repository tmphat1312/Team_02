import { Footer } from "@/components/layout/footer";
import { TenantHeader } from "@/components/layout/tenant-header";
import { FlexWindow } from "@/components/layout/window";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlexWindow>
      <TenantHeader />
      {children}
      <Footer />
    </FlexWindow>
  );
}
