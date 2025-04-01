export function TableSkeleton() {
  return (
    <div
      className="animate-pulse space-y-4 p-4"
      aria-label="Loading Table"
      aria-hidden
    >
      {/* Table Header Skeleton */}
      <div className="h-10 rounded bg-gray-100"></div>

      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-6 rounded bg-gray-100"></div>
        ))}
      </div>

      {/* Paginator Skeleton */}
      <div className="mt-4 h-10 rounded bg-gray-100"></div>
    </div>
  );
}
