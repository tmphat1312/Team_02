import { Button } from 'primereact/button';
import { useTransition } from 'react';

import { authClient } from '../lib/auth-client';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      // !DEMO ONLY
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      await authClient.signOut();
    });
  };

  return (
    <Button
      onClick={handleLogout}
      label="Logout"
      size="small"
      icon="pi pi-sign-out"
      loading={isPending}
      disabled={isPending}
      text
    />
  );
}
