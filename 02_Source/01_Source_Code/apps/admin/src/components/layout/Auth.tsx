import { Navigate, Outlet } from 'react-router';
import { authClient } from '../../lib/auth-client';
import { DashboardSkeleton } from './Dashboard';

export function AuthLayout() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <Navigate to="/service-unavailable" replace={true} />;
  }

  if (data && data.user?.role === 'admin') {
    return <Navigate to="/amenities" replace={true} />;
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-gray-50">
      <Outlet />
    </main>
  );
}
