import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  User,
} from '@heroui/react';

import { LogoutButton } from './LogoutButton';

import { authClient } from '../lib/auth-client';

export function UserAvatar() {
  const { isPending, data } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex w-full max-w-[160px] items-center gap-3">
        <div>
          <Skeleton className="flex size-10 rounded-full" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-3 w-3/6 rounded-lg" />
          <Skeleton className="h-3 w-4/6 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger className="cursor-pointer">
        <User
          avatarProps={{
            name: data.user.name,
          }}
          description={data.user.email}
          name={data.user.name}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
