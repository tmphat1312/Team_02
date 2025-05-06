import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { TenantHeader } from "@/components/layout/tenant-header";
import { GridWindow } from "@/components/layout/window";
import { UserOnly } from "@/features/auth/components/user-only";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridWindow>
      <UserOnly>
        <TenantHeader />
        <Container>{children}</Container>
        <Footer />
      </UserOnly>
    </GridWindow>
  );
}
