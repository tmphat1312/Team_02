import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Skeleton } from "@/components/ui/skeleton";

export function ListFallback() {
  return (
    <Grid className="gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-2.5 rounded-xl aspect-square w-full" />
          <Stack className="justify-between h-5 gap-2 mb-2">
            <Skeleton className="w-2/3 h-full" />
            <Skeleton className="h-full w-1/8" />
          </Stack>
          <Skeleton className="w-1/2 h-5" />
        </div>
      ))}
    </Grid>
  );
}
