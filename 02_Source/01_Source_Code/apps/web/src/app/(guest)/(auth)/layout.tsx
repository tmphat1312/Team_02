import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { TenantHeader } from "@/components/layout/tenant-header";
import { GridWindow } from "@/components/layout/window";
import { GuestOnly } from "@/features/auth/components/guest-only";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestOnly>
      <GridWindow>
        <TenantHeader />
        <Container>{children}</Container>
        <Footer />
      </GridWindow>
    </GuestOnly>
  );
}
