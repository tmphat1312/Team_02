import { FilterButtons } from "@/components/filter-buttons";
import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";
import { getUser } from "@/features/auth/data/get-user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Reservations } from "./components/reservations";
import { makeTenantReservationsQueryOptions } from "./hooks/use-tenant-reservations";

export default async function TripsPage() {
  const queryClient = new QueryClient();
  const tenant = await getUser();

  await queryClient.prefetchQuery(
    makeTenantReservationsQueryOptions(tenant.id)
  );

  return (
    <Page>
      <PageHeading>Your Trips</PageHeading>
      <FilterButtons
        tabs={[
          { value: null, label: "All" },
          { value: "upcoming", label: "Upcoming" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ]}
        className="mb-8"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Reservations />
      </HydrationBoundary>
    </Page>
  );
}
