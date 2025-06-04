import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";
import { Numbers } from "./components/numbers";
import { ListingRevenue } from "./components/listing-revenue";

export default function RevenuePage() {
  return (
    <Page>
      <PageHeading>Revenue</PageHeading>
      <Stack orientation="vertical" className="gap-8">
        <Numbers />
        <ListingRevenue />
      </Stack>
    </Page>
  );
}
