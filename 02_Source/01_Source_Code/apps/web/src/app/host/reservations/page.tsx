import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";

import { ReservationList } from "./components/reservation-list";
import { FilterButtons } from "@/components/filter-buttons";

export default function ReservationsPage() {
  return (
    <Page className="py-8">
      <PageHeading>Reservations</PageHeading>
      <FilterButtons
        tabs={[
          { label: "All", value: null },
          { label: "Upcoming", value: "upcoming" },
          { label: "Completed", value: "completed" },
          { label: "Cancelled", value: "cancelled" },
        ]}
        className="mb-8"
      />
      <ReservationList />
    </Page>
  );
}
