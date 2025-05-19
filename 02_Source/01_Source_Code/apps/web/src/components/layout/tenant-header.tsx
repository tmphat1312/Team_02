import { AppLogo } from "./app-logo";
import { Container } from "./container";
import { Header } from "./header";
import { Stack } from "./stack";
import { ToHostButton } from "./to-host-button";
import { UserButton } from "./user-button";

type HeaderProps = {
  containerType?: "wide" | "narrow";
};

export function TenantHeader({ containerType = "wide" }: HeaderProps) {
  return (
    <Header>
      <Container size={containerType == "wide" ? "default" : "sm"}>
        <Stack className="justify-between h-20">
          <AppLogo />
          <Stack className="gap-2">
            <ToHostButton />
            <UserButton />
          </Stack>
        </Stack>
      </Container>
    </Header>
  );
}
