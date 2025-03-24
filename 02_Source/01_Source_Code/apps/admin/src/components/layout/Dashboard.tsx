import { Outlet } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <main className="grid min-h-dvh grid-cols-[200px_auto]">
      <div className="border-r border-gray-300">
        <Sidebar />
      </div>
      <div className="grid max-h-dvh grid-rows-[auto_1fr] overflow-clip bg-gray-50">
        <div className="border-b border-gray-300">
          <Header />
        </div>
        <div className="overflow-y-auto px-8 py-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
