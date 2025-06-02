import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";

import { Reservations } from "./components/reservations";
import { FilterButtons } from "@/components/filter-buttons";

export default function ReservationsPage() {
  return (
    <Page className="py-8">
      <PageHeading>Reservations</PageHeading>
      <FilterButtons
        tabs={[
          { label: "All", value: null },
          { label: "New", value: "new" },
          { label: "Upcoming", value: "upcoming" },
          { label: "Completed", value: "completed" },
          { label: "Canceled", value: "cancelled" },
        ]}
        className="mb-8"
      />
      <Reservations />
    </Page>
  );
}
