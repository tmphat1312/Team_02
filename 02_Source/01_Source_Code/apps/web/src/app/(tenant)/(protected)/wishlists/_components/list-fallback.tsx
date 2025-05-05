import { Skeleton } from "@/components/ui/skeleton";

export function ListFallback() {
  return (
    <div className="flex flex-wrap gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="max-w-70">
          <Skeleton className="size-70 rounded-md mb-2.5" />
          <div className="flex gap-2 h-5 justify-between mb-1">
            <Skeleton className="w-2/3 h-full" />
            <Skeleton className="w-1/8 h-full" />
          </div>
          <Skeleton className="w-1/2 h-5" />
        </div>
      ))}
    </div>
  );
}
