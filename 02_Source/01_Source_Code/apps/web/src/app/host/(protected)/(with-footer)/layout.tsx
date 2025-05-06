import { Footer } from "@/components/layout/footer";
import { HostHeader } from "@/components/layout/host-header";

import { Container } from "@/components/layout/container";
import { GridWindow } from "@/components/layout/window";

export default async function ProtectedHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridWindow>
      <HostHeader />
      <Container>{children}</Container>
      <Footer />
    </GridWindow>
  );
}
