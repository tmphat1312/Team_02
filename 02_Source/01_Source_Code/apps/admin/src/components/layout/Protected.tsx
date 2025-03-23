import { Navigate, Outlet } from 'react-router';
import { authClient } from '../../lib/auth-client';

export function ProtectedLayout() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <Navigate to="/login" replace={true} />;
  }

  if (data.user.role !== 'admin') {
    return <div>You are not authorized to access this site. </div>;
  }

  return <Outlet />;
}
