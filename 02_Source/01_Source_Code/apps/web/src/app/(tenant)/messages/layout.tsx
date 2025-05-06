import { Container } from "@/components/layout/container";
import { TenantHeader } from "@/components/layout/tenant-header";
import { FlexWindow } from "@/components/layout/window";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlexWindow>
      <TenantHeader />
      <Container>{children}</Container>
    </FlexWindow>
  );
}
