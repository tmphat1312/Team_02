import { Stack } from "@/components/layout/stack";
import { Skeleton } from "@/components/ui/skeleton";

export function ListFallback() {
  return (
    <Stack className="flex-wrap gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="max-w-70">
          <Skeleton className="mb-2.5 rounded-md size-70" />
          <Stack className="justify-between h-5 gap-2 mb-1">
            <Skeleton className="w-2/3 h-full" />
            <Skeleton className="h-full w-1/8" />
          </Stack>
          <Skeleton className="w-1/2 h-5" />
        </div>
      ))}
    </Stack>
  );
}
