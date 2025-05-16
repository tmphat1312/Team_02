import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { TenantHeader } from "@/components/layout/tenant-header";
import { GridWindow } from "@/components/layout/window";

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridWindow>
      <TenantHeader />
      <Container>{children}</Container>
      <Footer />
    </GridWindow>
  );
}
