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

  if (!data) {
    return <Navigate to="/login" replace={true} />;
  }

  if (data.user.role !== 'admin') {
    return <div>You are not authorized to access this site.</div>;
  }

  return <Outlet />;
}
