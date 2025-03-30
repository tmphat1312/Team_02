import { Avatar, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';

import { LogoutButton } from './LogoutButton';

import { authClient } from '../lib/auth-client';

export function UserAvatar() {
  const { isPending, data } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div>{data.user.email}</div>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Avatar name={data.user.name} isBordered radius="lg" size="sm" />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </div>
  );
}
