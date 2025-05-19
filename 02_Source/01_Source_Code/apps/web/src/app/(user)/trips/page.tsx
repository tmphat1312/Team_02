import { FilterButtons } from "@/components/filter-buttons";
import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";

import { Reservations } from "./components/reservations";

export default async function TripsPage() {
  return (
    <Page>
      <PageHeading>Your Trips</PageHeading>
      <FilterButtons
        tabs={[
          { value: null, label: "All" },
          { value: "upcoming", label: "Upcoming" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Canceled" },
        ]}
        className="mb-8"
      />
      <Reservations />
    </Page>
  );
}
