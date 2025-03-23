import { authClient } from '../lib/auth-client';
import { LogoutButton } from './LogoutButton';

export function UserAvatar() {
  const { isPending, data } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <div>{data?.user.email}</div>
      <LogoutButton />
    </div>
  );
}
