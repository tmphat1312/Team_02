import { UserAvatar } from '../UserAvatar';

export function Header() {
  return (
    <header className="flex items-center justify-end bg-white px-6 py-4">
      <UserAvatar />
    </header>
  );
}
