import { DoorClosed } from "lucide-react";

import { Reservation } from "@/app/typings/models";

type ArrivingSoonListProps = {
  items: Reservation[];
};

export function ArrivingSoonList({ items }: ArrivingSoonListProps) {
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4">
        <DoorClosed className="size-20 text-gray-500" />
        <h3>No reservations arriving today. Checkout tomorrow.</h3>
      </section>
    );
  }

  return <div>ArrivingSoonList Component</div>;
}
