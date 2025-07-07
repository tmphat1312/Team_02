import { Navigate, Outlet } from 'react-router';
import { authClient } from '../../lib/auth-client';
import { DashboardSkeleton } from './Dashboard';

export function ProtectedLayout() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (data.user.role !== 'admin') {
    authClient.signOut();
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}
