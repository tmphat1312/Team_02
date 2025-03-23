import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <main className="grid min-h-dvh place-content-center bg-gray-50">
      <Outlet />
    </main>
  );
}
