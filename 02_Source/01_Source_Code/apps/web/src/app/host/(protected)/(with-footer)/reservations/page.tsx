import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";

import { FilterButtons } from "./components/filter-buttons";
import { ReservationList } from "./components/reservation-list";

export default function ReservationsPage() {
  return (
    <Page className="py-8">
      <PageHeading>Reservations</PageHeading>
      <FilterButtons className="mb-8" />
      <ReservationList />
    </Page>
  );
}
