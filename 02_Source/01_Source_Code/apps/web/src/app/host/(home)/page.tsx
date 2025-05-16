import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";

import { CreateListingModal } from "./components/create-listing-modal";
import { Listings } from "./components/listings";

import { getUser } from "@/features/auth/data/get-user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { listingsQueryOptions } from "./hooks/use-listings";

export default async function ListingsPage() {
  const queryClient = new QueryClient();
  const host = await getUser();
  await queryClient.prefetchQuery(listingsQueryOptions(host.id));

  return (
    <Page>
      <Stack className="justify-between mb-8">
        <PageHeading className="mb-0">Your listings</PageHeading>
        <CreateListingModal />
      </Stack>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Listings />
      </HydrationBoundary>
    </Page>
  );
}
