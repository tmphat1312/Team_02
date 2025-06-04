import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";

import { CreateListingModal } from "./components/create-listing-modal";
import { Listings } from "./components/listings";

export default async function ListingsPage() {
  return (
    <Page>
      <Stack className="justify-between mb-8">
        <PageHeading className="mb-0">Your listings</PageHeading>
        <CreateListingModal />
      </Stack>
      <Listings />
    </Page>
  );
}
