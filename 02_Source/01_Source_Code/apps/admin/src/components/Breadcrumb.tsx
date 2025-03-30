import { NavLink } from 'react-router';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';

type BreadcrumbProps = {
  items: { label: string; to: string }[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Breadcrumbs className="py-2">
      <BreadcrumbItem isDisabled>Home</BreadcrumbItem>
      {items.map((item) => (
        <BreadcrumbItem key={item.to}>
          <NavLink to={item.to}>{item.label}</NavLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
