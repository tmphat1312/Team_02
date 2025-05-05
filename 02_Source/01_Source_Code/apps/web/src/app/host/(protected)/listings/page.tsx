import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus, Search } from "lucide-react";
import Image from "next/image";

// Sample listing data
const listings = [
  {
    id: "listing_1",
    title: "Minh Phat House",
    location: "Phước Vân, Long An",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: true,
    price: 85,
    rating: 4.92,
    reviews: 128,
    type: "Entire home",
    beds: 3,
    baths: 2,
  },
  {
    id: "listing_2",
    title: "Test property",
    location: "tt. Bến Lức, Long An",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: true,
    price: 120,
    rating: 4.85,
    reviews: 64,
    type: "Unique stay",
    beds: 2,
    baths: 1,
  },
  {
    id: "listing_3",
    title: "Beachfront Villa",
    location: "Vũng Tàu, Bà Rịa - Vũng Tàu",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: false,
    price: 250,
    rating: 4.98,
    reviews: 215,
    type: "Entire villa",
    beds: 5,
    baths: 4,
  },
  {
    id: "listing_4",
    title: "City Center Apartment",
    location: "District 1, Ho Chi Minh City",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: false,
    price: 75,
    rating: 4.78,
    reviews: 183,
    type: "Entire apartment",
    beds: 2,
    baths: 1,
  },
];

export default function ListingsPage() {
  return (
    <div className="width-container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your listings</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="group overflow-hidden rounded-xl border"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {listing.actionRequired && (
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-rose-500 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                    Action required
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium">{listing.title}</h3>
              <p className="text-sm text-muted-foreground">
                {listing.location}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">${listing.price} night</p>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <span className="mr-1">★</span>
                    <span>{listing.rating}</span>
                    <span className="mx-1">·</span>
                    <span>{listing.reviews} reviews</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
