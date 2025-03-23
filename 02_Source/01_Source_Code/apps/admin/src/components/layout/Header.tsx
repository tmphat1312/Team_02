import { TextLogo } from '../TextLogo';
import { UserAvatar } from '../UserAvatar';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2">
      <TextLogo />
      <UserAvatar />
    </header>
  );
}
