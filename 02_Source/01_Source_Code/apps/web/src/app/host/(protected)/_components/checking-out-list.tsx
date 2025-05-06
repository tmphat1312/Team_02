import { DoorOpen } from "lucide-react";

import { Reservation } from "@/app/typings/models";

type CheckingOutListProps = { items: Reservation[] };

export function CheckingOutList({ items }: CheckingOutListProps) {
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4">
        <DoorOpen className="size-20 text-gray-500" />
        <h3>No reservations checking out for today. Checkout tomorrow.</h3>
      </section>
    );
  }

  return <div>CheckingOutList Component</div>;
}
