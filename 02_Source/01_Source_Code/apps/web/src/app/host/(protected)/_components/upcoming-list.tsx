import { Reservation } from "@/app/typings/models";
import { Notebook } from "lucide-react";

type UpcomingListProps = {
  items: Reservation[];
};

export function UpcomingList({ items }: UpcomingListProps) {  
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4">
        <Notebook className="size-20 text-gray-500" />
        <h3>No reservations upcoming for today. Checkout tomorrow.</h3>
      </section>
    );
  }

  return <div>UpcomingList Component</div>;
}
