import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { AddToRecentlyViewedList } from "./_components/add-to-recently-viewed-list";
import { HostDetails } from "./_components/host-details";
import { PhotoGallery } from "./_components/photo-gallery";
import { PropertyInfo } from "./_components/property-info";
import { PropertyMaps } from "./_components/property-maps";
import { PropertyReservation } from "./_components/property-reservation";
import { PropertyReviews } from "./_components/property-reviews";
import { PropertyRules } from "./_components/property-rules";
import { PropertyTitle } from "./_components/property-title";
import { fetchPropertyDetails } from "./_data/fetch-property-details";

const mockAmenities = [
  {
    id: 44,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Wine Glasses",
    description: "Elegant wine glasses for enjoying your favorite wines.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574864/Amenities/wine-glasses_grjt4v.svg",
  },
  {
    id: 43,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Wi-Fi",
    description:
      "High-speed internet connection for browsing, streaming, and staying connected.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574866/Amenities/wifi_olgx9j.svg",
  },
  {
    id: 42,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "TV",
    description: "A television for watching your favorite shows and movies.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574865/Amenities/tv_pve6k2.svg",
  },
  {
    id: 41,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Sun Loungers",
    description:
      "Comfortable loungers for soaking up the sun and relaxing outdoors.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574870/Amenities/sun-loungers_osellv.svg",
  },
  {
    id: 40,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Stove",
    description: "A stove for cooking meals with gas or electric burners.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574863/Amenities/stove_stt88v.svg",
  },
  {
    id: 39,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Smoke Alarm",
    description: "A safety feature that alerts you to smoke or fire hazards.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574863/Amenities/smoke-alarm_dsexhd.svg",
  },
  {
    id: 38,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Shampoo",
    description: "Shampoo for washing and maintaining clean, healthy hair.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574863/Amenities/shampoo_chkiyu.svg",
  },
  {
    id: 37,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Self Check-in",
    description: "A convenient self check-in process for a smooth arrival.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574870/Amenities/self-check-in_jndxrr.svg",
  },
  {
    id: 36,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Rice Maker",
    description: "A convenient appliance for cooking rice quickly and easily.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574863/Amenities/rice-maker_yjcyez.svg",
  },
  {
    id: 35,
    createdAt: "2025-04-14T20:06:39.752Z",
    updatedAt: "2025-04-14T20:06:39.752Z",
    name: "Private Entrance",
    description:
      "A private entrance for guests, offering more privacy and convenience.",
    imageUrl:
      "https://res.cloudinary.com/dgdpitbum/image/upload/v1743574870/Amenities/private-entrance_knbe1v.svg",
  },
];

export default async function AirbnbRoomDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const details = await fetchPropertyDetails(id);

  return (
    <div className="details-container py-6 space-y-8">
      <PropertyTitle item={details} />
      <PhotoGallery
        imageUrls={details.imageUrls}
        propertyName={details.title}
      />
      <div className="grid grid-cols-3 gap-8 items-start">
        <PropertyInfo
          item={details}
          rating={{
            averageRating: 4.5,
            numberOfReviews: 100,
          }}
          host={{
            name: "John Doe",
            imageUrl: "/placeholder.svg",
            hostDate: "2023-10-01",
          }}
          amenities={mockAmenities}
          className="col-span-2"
        />
        <PropertyReservation item={details} />
      </div>
      <Separator />
      <Suspense>
        <PropertyReviews propertyId={details.id} />
      </Suspense>
      <Separator />
      <PropertyMaps longitude={details.longitude} latitude={details.latitude} />
      <Separator />
      <HostDetails />
      <Separator />
      <PropertyRules />
      <AddToRecentlyViewedList item={details} />
    </div>
  );
}
