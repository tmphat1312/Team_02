"use client";

import { useUser } from "../hooks/use-user";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function TenantSignedIn({ children, fallback }: Props) {
  const { isLoading, isTenant } = useUser();

  if (isLoading) {
    return fallback || null;
  }

  if (!isTenant) {
    return null;
  }

  return children;
}
