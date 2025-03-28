import { UserAvatar } from '../UserAvatar';

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-2">
      <div aria-hidden></div>
      <UserAvatar />
    </header>
  );
}
