import { Separator } from "@/components/ui/separator";

import { Feedback } from "./_components/feedback";
import { FilterButtons } from "./_components/filter-buttons";
import { ReservationList } from "./_components/reservation-list";

export default function ReservationsPage() {
  return (
    <div className="py-8">
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Reservations</h1>
      </section>

      <FilterButtons className="mb-6" />
      <ReservationList />
      <Separator className="mt-12 mb-8" />
      <Feedback />
    </div>
  );
}
