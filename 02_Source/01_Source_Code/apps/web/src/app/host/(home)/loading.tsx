import { Plus } from "lucide-react";

import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";
import { Button } from "@/components/ui/button";

import { ListingCardFallback } from "./components/listing-card";

export default function Loading() {
  return (
    <Page>
      <Stack className="justify-between mb-8">
        <PageHeading className="mb-0">Your listings</PageHeading>
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <Plus className="size-4" />
        </Button>
      </Stack>
      <Grid className="grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ListingCardFallback key={index} />
        ))}
      </Grid>
    </Page>
  );
}
