import { HostLogo } from "./host-logo";
import { HostNavigation } from "./host-navigation";
import { HostNotifications } from "./host-notifications";
import { UserButton } from "./user-button";

export function HostHeader() {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between h-20 width-container">
        <HostLogo />
        <HostNavigation />
        <div className="flex items-center gap-4">
          <HostNotifications />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
