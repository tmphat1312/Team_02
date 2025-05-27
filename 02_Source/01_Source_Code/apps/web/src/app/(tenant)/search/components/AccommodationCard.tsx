"use client";

import Accommodation from "@/types/Accommodation";
import Link from "next/link";

interface Props {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: Props) {
  return (
    <Link href={"/property/" + accommodation.id} className="cursor-pointer rounded-lg overflow-hidden shadow-md p-0 flex flex-col">
      {/* Image */}
      <div className="w-full">
        <img
          src={(accommodation.propertyImages?.length > 0 && accommodation.propertyImages[0].imageUrl) || "https://via.placeholder.com/150"}
          alt={accommodation.title}
          width={150}
          height={150}
          className="rounded-t-lg object-cover w-full"
        />
      </div>

      {/* Details */}
      <div className="w-full p-2">
        <h3 className="text-sm font-semibold">{accommodation.title}</h3>
        <p className="text-sm text-gray-600">{accommodation.location}</p>
        <p className="text-sm font-bold text-blue-600">
          ${accommodation.pricePerNight}
        </p>
        <p className="text-xs text-gray-500">
          {accommodation.bedrooms} bedrooms · {accommodation.beds}{" "}
          beds · {accommodation.guests} guests
        </p>
      </div>
    </Link>
  );
}
