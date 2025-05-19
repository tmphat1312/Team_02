import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Page>
      <Grid className="gap-8 grid-cols-[18rem_1fr]">
        <Skeleton className="h-52 rounded-xl" />
        <Skeleton className="h-132 rounded-xl" />
      </Grid>
    </Page>
  );
}
