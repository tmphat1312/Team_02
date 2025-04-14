import { Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";

const mockAmenities = [
  { id: 1, name: "Pool" },
  { id: 2, name: "Gym" },
  { id: 3, name: "Parking" },
  { id: 4, name: "Wi-Fi" },
  { id: 5, name: "Breakfast" },
  { id: 6, name: "Air Conditioning" },
  { id: 7, name: "Pet Friendly" },
  { id: 8, name: "Laundry" },
  { id: 9, name: "Spa" },
  { id: 10, name: "Bar" },
  { id: 11, name: "Restaurant" },
];

export function AmenityInput() {
  return (
    <div className="flex flex-wrap gap-2">
      {mockAmenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          className="rounded-full py-2.5 px-4 border-gray-300 font-normal"
        >
          <Wifi />
          {amenity.name}
        </Button>
      ))}
    </div>
  );
}
