import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";
import { getServerSession } from "@/features/auth/data/get-server-session";
import { fetchHostListings } from "@/features/listing/data/fetch-host-listings";

import { CreateListingModal } from "./components/create-listing-modal";
import { Listings } from "./components/listings";

export default async function ListingsPage() {
  const session = await getServerSession();
  const host = session!.user;

  const listings = await fetchHostListings({ hostId: host.id });

  return (
    <Page>
      <Stack className="justify-between mb-8">
        <PageHeading className="mb-0">Your listings</PageHeading>
        <CreateListingModal />
      </Stack>
      <Listings items={listings} />
    </Page>
  );
}
