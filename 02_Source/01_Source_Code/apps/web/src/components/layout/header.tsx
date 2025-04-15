import { AppLogo } from "./app-logo";
import { GlobeButton } from "./globe-button";
import { ToHostButton } from "./to-host-button";
import { UserButton } from "./user-button";

type Props = {
  containerType?: "wide" | "narrow";
};

export function Header({ containerType = "wide" }: Props) {
  const containerClass =
    containerType === "wide" ? "width-container" : "details-container";

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className={containerClass}>
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <AppLogo />

          {/* Center - can be used for search on larger screens */}
          <div className="hidden md:flex">
            {/* Search component would go here */}
          </div>

          {/* Right side navigation */}
          <div className="flex items-center">
            <ToHostButton />
            <GlobeButton />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
