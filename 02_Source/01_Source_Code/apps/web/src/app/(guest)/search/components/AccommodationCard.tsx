"use client";

import Accommodation from "@/types/Accommodation";
import Link from "next/link";
import "./Galleria.css"; // Ensure you have the correct path to your Galleria styles
import { Galleria } from "primereact/galleria";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

interface Props {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: Props) {
  const images =
    accommodation.propertyImages && accommodation.propertyImages.length > 0
      ? accommodation.propertyImages
      : [{ imageUrl: "https://placehold.co/400x300?text=No+Image" }];
  const itemTemplate = (item: { imageUrl: string }) => (
    <img
      src={item.imageUrl}
      alt={accommodation.title}
      className="object-cover rounded-t-lg"
      style={{ objectFit: "cover", width: "100%", height: "200px"}}
    />
  );
  const thumbnailTemplate = (item: { imageUrl: string }) => (
    <img
      src={item.imageUrl}
      alt="thumbnail"
      className="object-cover rounded w-12 h-12"
      style={{ width: "48px", height: "48px", objectFit: "cover" }}
    />
  );
  return (
    <Link
      href={"/property/" + accommodation.id}
      className="cursor-pointer rounded-lg overflow-hidden shadow-md p-0 flex flex-col"
    >
      {/* Galleria Carousel */}
      <div className="w-full h-50 relative">
        <Galleria
          value={images}
          numVisible={5}
          circular
          style={{ maxWidth: "100%", height: "160px" }}
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          className="custom-galleria-arrows"
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
          {accommodation.bedrooms} bedrooms · {accommodation.beds} beds ·{" "}
          {accommodation.guests} guests
        </p>
      </div>
    </Link>
  );
}
