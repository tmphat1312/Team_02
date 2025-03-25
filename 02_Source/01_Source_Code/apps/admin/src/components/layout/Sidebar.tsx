import { TextLogo } from '../TextLogo';
import { NavigationMenu } from './NavigationMenu';

export function Sidebar() {
  return (
    <aside className="p-4">
      <div className="mb-8 text-center">
        <TextLogo />
      </div>
      <NavigationMenu />
    </aside>
  );
}
