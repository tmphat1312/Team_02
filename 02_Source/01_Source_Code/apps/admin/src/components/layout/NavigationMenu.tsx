import clsx from 'clsx';
import { PrimeIcons } from 'primereact/api';
import { NavLink } from 'react-router';

type NavItem = {
  label: string;
  to: string;
  icon?: string;
};

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: PrimeIcons.HOME,
  },
  {
    label: 'Users',
    to: '/users',
    icon: PrimeIcons.USERS,
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: PrimeIcons.TAG,
  },
  {
    label: 'Amenities',
    to: '/amenities',
    icon: PrimeIcons.WIFI,
  },
  {
    label: 'Properties',
    to: '/properties',
    icon: PrimeIcons.BUILDING,
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
                clsx(
                  `flex items-center gap-2.5 rounded px-2 py-1.5 text-sm hover:bg-gray-100`,
                  isActive && `bg-indigo-100 font-medium text-indigo-900`
                )
              }
            >
              {item.icon && (
                <i className={item.icon} style={{ fontSize: '0.85rem' }} />
              )}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
