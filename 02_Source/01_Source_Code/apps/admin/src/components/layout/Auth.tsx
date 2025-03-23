import { Navigate, Outlet } from 'react-router';
import { authClient } from '../../lib/auth-client';

export function AuthLayout() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data && data.user.role === 'admin') {
    return <Navigate to="/users" replace={true} />;
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-gray-50">
      <Outlet />
    </main>
  );
}
