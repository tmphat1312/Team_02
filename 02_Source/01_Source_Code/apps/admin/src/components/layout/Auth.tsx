import { Navigate, Outlet } from 'react-router';
import { authClient } from '../../lib/auth-client';
import { DashboardSkeleton } from './Dashboard';
import { Message } from 'primereact/message';

export function AuthLayout() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <Message severity="error" text={error.message} />;
  }

  if (data && data.user.role === 'admin') {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-gray-50">
      <Outlet />
    </main>
  );
}
