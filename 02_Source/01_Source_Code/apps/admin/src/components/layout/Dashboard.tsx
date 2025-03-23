import { Outlet } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <main className="min-h-dvh">
      <div className="border-b border-gray-300">
        <Header />
      </div>
      <div className="grid h-full grid-cols-10 gap-4">
        <div className="col-span-2 border-r border-gray-300">
          <Sidebar />
        </div>
        <div className="col-span-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
