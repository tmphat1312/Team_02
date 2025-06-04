import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { TenantHeader } from "@/components/layout/tenant-header";
import { GridWindow } from "@/components/layout/window";

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridWindow>
      <TenantHeader containerType="narrow" />
      <Container size="sm">{children}</Container>
      <Footer containerType="narrow" />
    </GridWindow>
  );
}
