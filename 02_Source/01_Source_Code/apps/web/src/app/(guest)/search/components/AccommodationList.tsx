import React from "react";
import AccommodationCard from "./AccommodationCard";
import Accommodation from "@/types/Accommodation";

export default function AccommodationList({ items }: { items: Accommodation[] }){
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
      {items.length > 0 &&
        items.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}

      {items.length === 0 && (
        <div className="p-0 m-0 text-gray-500 w-full">
          No accommodations found
        </div>
      )}
    </div>
  );
};