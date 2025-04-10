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
          src={accommodation.cover_img_src || "https://via.placeholder.com/150"}
          alt={accommodation.title}
          width={150}
          height={150}
          className="rounded-t-lg object-cover w-full"
        />
      </div>

      {/* Details */}
      <div className="w-full p-2">
        <h3 className="text-sm font-semibold">{accommodation.title}</h3>
        <p className="text-sm text-gray-600">{accommodation.address}</p>
        <p className="text-sm font-bold text-blue-600">
          ${accommodation.price}
        </p>
        <p className="text-xs text-gray-500">
          {accommodation.num_of_bedroom} bedrooms · {accommodation.num_of_bed}{" "}
          beds · {accommodation.max_guests} guests
        </p>
      </div>
    </Link>
  );
}
