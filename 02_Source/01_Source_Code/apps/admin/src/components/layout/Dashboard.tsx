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
        <div
          className="overflow-y-auto px-8 py-3"
          style={{
            scrollbarGutter: 'stable',
          }}
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export function DashboardSkeleton() {
  return (
    <div
      className="grid min-h-dvh animate-pulse grid-cols-[200px_auto]"
      aria-label="Loading dashboard"
      aria-hidden
    >
      {/* Sidebar Skeleton */}
      <div className="border-r border-gray-300 bg-gray-100"></div>

      {/* Main Content Skeleton */}
      <div className="grid max-h-dvh grid-rows-[auto_1fr] overflow-clip bg-gray-50">
        {/* Header Skeleton */}
        <div className="h-12 border-b border-gray-300 bg-gray-100"></div>

        {/* Content Skeleton */}
        <div className="space-y-4 overflow-y-auto p-8">
          <div className="size-full rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}
