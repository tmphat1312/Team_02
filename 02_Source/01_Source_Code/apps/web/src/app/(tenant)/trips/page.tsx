"use client";

import { Trip } from "@/typings/models";
import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";

import { FilterButtons } from "./components/filter-buttons";
import { ReservationCard } from "./components/reservation-card";
import { useActiveTab } from "./hooks/use-active-tab";

const mockTrips: Trip[] = [
  {
    id: 1,
    propertyId: 1,
    status: "upcoming",
    property: {
      name: "Beachfront Villa with Infinity Pool",
      address: "Bali, Indonesia",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
      hostId: "host1",
      host: {
        name: "Sarah",
        image: "/placeholder.svg",
      },
    },
    checkInDate: "Jun 15, 2025",
    checkOutDate: "Jun 22, 2025",
    numberOfGuests: 2,
    totalPrice: 1200,
  },
  {
    id: 2,
    propertyId: 2,
    status: "upcoming",
    property: {
      name: "Mountain Cabin with Hot Tub",
      address: "Aspen, Colorado",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
      hostId: "host2",
      host: {
        name: "Michael",
        image: "/placeholder.svg",
      },
    },
    checkInDate: "Jul 10, 2025",
    checkOutDate: "Jul 15, 2025",
    numberOfGuests: 4,
    totalPrice: 980,
  },
  {
    id: 3,
    propertyId: 3,
    status: "completed",
    property: {
      name: "Luxury Apartment in City Center",
      address: "Paris, France",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
      hostId: "host3",
      host: {
        name: "Julia",
        image: "/placeholder.svg",
      },
    },
    checkInDate: "Mar 5, 2025",
    checkOutDate: "Mar 10, 2025",
    numberOfGuests: 2,
    totalPrice: 850,
  },
  {
    id: 4,
    propertyId: 4,
    status: "completed",
    property: {
      name: "Cozy Cottage by the Lake",
      address: "Lake Tahoe, California",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
      hostId: "host4",
      host: {
        name: "David",
        image: "/placeholder.svg",
      },
    },
    checkInDate: "Jan 15, 2025",
    checkOutDate: "Jan 20, 2025",
    numberOfGuests: 3,
    totalPrice: 720,
  },
  {
    id: 5,
    propertyId: 5,
    status: "cancelled",
    property: {
      name: "Modern Loft with City Views",
      address: "New York, NY",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
      hostId: "host5",
      host: {
        name: "Emma",
        image: "/placeholder.svg",
      },
    },
    checkInDate: "Feb 20, 2025",
    checkOutDate: "Feb 25, 2025",
    numberOfGuests: 2,
    totalPrice: 950,
  },
];

export default function TripsPage() {
  const [activeTab] = useActiveTab();

  const filteredTrips = activeTab
    ? mockTrips.filter((trip) => trip.status === activeTab)
    : mockTrips;

  return (
    <Page>
      <PageHeading>Your Trips</PageHeading>
      <FilterButtons className="mb-8" />
      <Grid className="grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrips.map((trip) => (
          <ReservationCard key={trip.id} item={trip} />
        ))}
      </Grid>
    </Page>
  );
}
