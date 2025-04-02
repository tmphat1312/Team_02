import { cn } from '@heroui/theme';
import { TagsIcon, WifiIcon } from 'lucide-react';
import { JSX } from 'react';
import { NavLink } from 'react-router';

type NavItem = {
  label: string;
  to: string;
  icon: JSX.Element;
};

const NAV_ITEMS = [
  {
    label: 'Amenities',
    to: '/amenities',
    icon: <WifiIcon />,
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: <TagsIcon />,
  },
] satisfies NavItem[];

export function NavigationMenu() {
  return (
    <nav aria-label="Main navigation">
      <h2 className="mb-4 text-sm uppercase">Navigation</h2>
      <ul className="flex h-full flex-col justify-center space-y-1.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  `flex items-center gap-2.5 rounded px-2 py-1.5 text-sm hover:bg-gray-100`,
                  isActive && `bg-indigo-100 font-medium text-indigo-900`
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
