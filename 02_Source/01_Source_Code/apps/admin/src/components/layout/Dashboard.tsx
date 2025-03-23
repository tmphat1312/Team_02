import { Outlet } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <main className="flex min-h-dvh flex-col">
      <div className="grid h-full flex-grow grid-cols-12">
        <div className="col-span-2 border-r border-gray-300">
          <Sidebar />
        </div>
        <div className="col-span-10 bg-gray-50">
          <div className="border-b border-gray-300">
            <Header />
          </div>
          <div className="px-8 py-3">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
