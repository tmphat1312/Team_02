import { Container } from "./container";
import { Header } from "./header";
import { HostLogo } from "./host-logo";
import { HostNavigation } from "./host-navigation";
import { HostNotifications } from "./host-notifications";
import { Stack } from "./stack";
import { ToTenantButton } from "./to-tenant-button";
import { UserButton } from "./user-button";

export function HostHeader() {
  return (
    <Header>
      <Container>
        <Stack className="justify-between h-20">
          <HostLogo />
          <HostNavigation />
          <Stack className="gap-4">
            <ToTenantButton />
            <HostNotifications />
            <UserButton />
          </Stack>
        </Stack>
      </Container>
    </Header>
  );
}
