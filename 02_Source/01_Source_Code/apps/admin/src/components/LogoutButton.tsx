import { useTransition } from 'react';

import { Button } from '@heroui/button';
import { cn } from '@heroui/theme';
import { LogOutIcon } from 'lucide-react';

import { authClient } from '../lib/auth-client';

// TODO: move to auth feature

export function LogoutButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut();
    });
  };

  return (
    <Button
      isLoading={isPending}
      onPress={handleLogout}
      disabled={isPending}
      variant="light"
      className={cn('inline-flex items-center', className)}
      startContent={<LogOutIcon className={isPending ? 'hidden' : ''} />}
      {...props}
    >
      Logout
    </Button>
  );
}
