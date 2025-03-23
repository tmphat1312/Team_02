import { Logo } from '../Logo';
import { UserAvatar } from '../UserAvatar';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <UserAvatar />
    </header>
  );
}
