import { cn } from '@heroui/theme';
import {
  HousePlugIcon,
  LayoutDashboardIcon,
  TagsIcon,
  UsersIcon,
  WifiIcon,
} from 'lucide-react';
import { JSX, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';

export function NavigationMenu() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const route = keyToRouteMap[event.key];
      if (route) navigate(route);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

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

type NavItem = {
  label: string;
  to: string;
  icon?: JSX.Element;
  keyboardShortcut?: string;
};

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <LayoutDashboardIcon />,
    keyboardShortcut: 'D',
  },
  {
    label: 'Users',
    to: '/users',
    icon: <UsersIcon />,
    keyboardShortcut: 'U',
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: <TagsIcon />,
    keyboardShortcut: 'C',
  },
  {
    label: 'Amenities',
    to: '/amenities',
    icon: <WifiIcon />,
    keyboardShortcut: 'A',
  },
  {
    label: 'Properties',
    to: '/properties',
    icon: <HousePlugIcon />,
    keyboardShortcut: 'P',
  },
] satisfies NavItem[];

const keyToRouteMap = NAV_ITEMS.reduce<Record<string, string>>((acc, item) => {
  if (item.keyboardShortcut) {
    acc[item.keyboardShortcut] = item.to;
  }
  return acc;
}, {});
