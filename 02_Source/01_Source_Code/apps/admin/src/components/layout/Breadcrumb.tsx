import { NavLink } from 'react-router';

export type BreadcrumbProps = {
  items: { label: string; to: string }[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-4 py-1">
      <ul className="flex items-center">
        <li>
          <i className="pi pi-home" />
        </li>
        {items.map((item) => (
          <li key={item.to}>
            <span aria-hidden className="mx-2">
              /
            </span>
            <NavLink to={item.to} className="hover:underline">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
