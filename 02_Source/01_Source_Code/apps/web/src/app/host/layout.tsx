import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { HostHeader } from "@/components/layout/host-header";
import { GridWindow } from "@/components/layout/window";
import { HostOnly } from "@/features/auth/components/host-only";

export default async function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HostOnly>
      <GridWindow>
        <HostHeader />
        <Container>{children}</Container>
        <Footer />
      </GridWindow>
    </HostOnly>
  );
}
