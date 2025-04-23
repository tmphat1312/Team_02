import { Separator } from "@/components/ui/separator";

import { PhotoGallery } from "./_components/photo-gallery";
import { PropertyInfo } from "./_components/property-info";
import { PropertyReservation } from "./_components/property-reservation";
import { PropertyReviews } from "./_components/property-reviews";
import { PropertyRules } from "./_components/property-rules";
import { PropertyTitle } from "./_components/property-title";
import { PropertyMaps } from "./_components/property-maps";
import { HostDetails } from "./_components/host-details";

const mockData = {
  id: 1,
  name: "Auberge Yugashira",
  location: "Imabari, Japan",
  distance: "3 miles away",
  price: 150,
  rating: 4.98,
  noReviews: 136,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking"],
  description:
    "A beautiful traditional Japanese wooden building located in a serene environment.",
  availableDates: ["April 10 - 20", "May 1 - 10"],
  host: {
    name: "John Doe",
    responseRate: "95%",
  },
  reviews: [
    {
      user: "Alice",
      comment: "Amazing stay!",
      rating: 5,
    },
    {
      user: "Bob",
      comment: "Very comfortable and clean.",
      rating: 4,
    },
  ],

  additionalInfo:
    "This property is known for its beautiful surroundings and excellent service.",
  bookingLink: "https://example.com/book/1", // Added booking link
};

const imageUrls = [
  "./placeholder.svg",
  "./placeholder.svg",
  "./placeholder.svg",
  "./placeholder.svg",
  "./placeholder.svg",
  "./placeholder.svg",
  "./placeholder.svg",
];

export default function AirbnbRoomDetails() {
  return (
    <div className="details-container py-6 space-y-8">
      <PropertyTitle title={mockData.name} propertyId={mockData.id} />
      <PhotoGallery imageUrls={imageUrls} propertyName={mockData.name} />
      <div className="grid grid-cols-3 gap-8">
        <PropertyInfo className="col-span-2" />
        <PropertyReservation />
      </div>
      <Separator />
      <PropertyReviews />
      <Separator />
      <PropertyMaps />
      <Separator />
      <HostDetails />
      <Separator />
      <PropertyRules />
    </div>
  );
}
