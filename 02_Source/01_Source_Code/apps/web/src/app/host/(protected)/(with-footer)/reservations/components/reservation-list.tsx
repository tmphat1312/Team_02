"use client";

import { Reservation } from "@/typings/models";
import { useActiveTab } from "../hooks/use-active-tab";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const reservations: Reservation[] = [
  // UPCOMING
  {
    id: 1,
    propertyId: 101,
    status: "upcoming",
    totalPrice: 500,
    property: {
      name: "Oceanview Retreat",
      address: "123 Beachside Blvd, Miami, FL",
      hostId: "host_001",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_001",
      name: "John Doe",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-05-10",
    checkOutDate: "2025-05-15",
    numberOfGuests: 2,
    payment: {
      status: "deposit-paid",
    },
  },
  {
    id: 2,
    propertyId: 102,
    status: "upcoming",
    totalPrice: 750,
    property: {
      name: "Mountain Cabin",
      address: "456 Pine Tree Rd, Aspen, CO",
      hostId: "host_002",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_002",
      name: "Jane Smith",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-06-01",
    checkOutDate: "2025-06-07",
    numberOfGuests: 4,
    payment: {
      status: "deposit-paid",
    },
  },
  {
    id: 3,
    propertyId: 103,
    status: "upcoming",
    totalPrice: 1200,
    property: {
      name: "Downtown Loft",
      address: "789 City Center, New York, NY",
      hostId: "host_003",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_003",
      name: "Alice Johnson",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-07-05",
    checkOutDate: "2025-07-10",
    numberOfGuests: 2,
    payment: {
      status: "deposit-paid",
    },
  },
  {
    id: 4,
    propertyId: 104,
    status: "upcoming",
    totalPrice: 400,
    property: {
      name: "Lakeside Cottage",
      address: "321 Lakeview Dr, Madison, WI",
      hostId: "host_004",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_004",
      name: "Bob Martin",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-05-20",
    checkOutDate: "2025-05-22",
    numberOfGuests: 3,
    payment: {
      status: "deposit-paid",
    },
  },
  {
    id: 5,
    propertyId: 105,
    status: "upcoming",
    totalPrice: 600,
    property: {
      name: "Sunset Villa",
      address: "654 Sunset Blvd, Los Angeles, CA",
      hostId: "host_005",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_005",
      name: "Charlie Brown",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-08-01",
    checkOutDate: "2025-08-05",
    numberOfGuests: 5,
    payment: {
      status: "deposit-paid",
    },
  },

  // COMPLETED
  {
    id: 6,
    propertyId: 106,
    status: "completed",
    totalPrice: 300,
    property: {
      name: "Cozy Studio",
      address: "987 College St, Boston, MA",
      hostId: "host_006",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_006",
      name: "Emma Davis",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-03-01",
    checkOutDate: "2025-03-05",
    numberOfGuests: 1,
    review: {
      rating: 4,
    },
    payment: {
      status: "full-paid",
    },
  },
  {
    id: 7,
    propertyId: 107,
    status: "completed",
    totalPrice: 850,
    property: {
      name: "Luxury Penthouse",
      address: "456 Highrise Ave, Chicago, IL",
      hostId: "host_007",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_007",
      name: "Lucas White",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-02-15",
    checkOutDate: "2025-02-20",
    numberOfGuests: 2,
    payment: {
      status: "full-paid",
    },
  },
  {
    id: 8,
    propertyId: 108,
    status: "completed",
    totalPrice: 950,
    property: {
      name: "Country Farmhouse",
      address: "159 Country Rd, Austin, TX",
      hostId: "host_008",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_008",
      name: "Sophia Green",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-01-10",
    checkOutDate: "2025-01-17",
    numberOfGuests: 6,
    review: {
      rating: 3,
    },
    payment: {
      status: "full-paid",
    },
  },
  {
    id: 9,
    propertyId: 109,
    status: "completed",
    totalPrice: 450,
    property: {
      name: "City Apartment",
      address: "321 Downtown St, Seattle, WA",
      hostId: "host_009",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_009",
      name: "Olivia Brown",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-04-01",
    checkOutDate: "2025-04-03",
    numberOfGuests: 2,
    payment: {
      status: "full-paid",
    },
  },
  {
    id: 10,
    propertyId: 110,
    status: "completed",
    totalPrice: 780,
    property: {
      name: "Seaside Bungalow",
      address: "753 Ocean Dr, San Diego, CA",
      hostId: "host_010",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_010",
      name: "Henry Scott",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-03-20",
    checkOutDate: "2025-03-25",
    numberOfGuests: 3,
    review: {
      rating: 4,
    },
    payment: {
      status: "full-paid",
    },
  },

  // CANCELLED
  {
    id: 11,
    propertyId: 111,
    status: "cancelled",
    totalPrice: 400,
    property: {
      name: "Tiny Home",
      address: "147 Tiny Ln, Portland, OR",
      hostId: "host_011",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_011",
      name: "Ella Wilson",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-05-01",
    checkOutDate: "2025-05-03",
    numberOfGuests: 2,
    payment: {
      status: "refunded",
    },
  },
  {
    id: 12,
    propertyId: 112,
    status: "cancelled",
    totalPrice: 670,
    property: {
      name: "Forest Cabin",
      address: "654 Woodland Ave, Tahoe, CA",
      hostId: "host_012",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_012",
      name: "Mason Carter",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-04-15",
    checkOutDate: "2025-04-20",
    numberOfGuests: 5,
    payment: {
      status: "refunded",
    },
  },
  {
    id: 13,
    propertyId: 113,
    status: "cancelled",
    totalPrice: 520,
    property: {
      name: "Desert Oasis",
      address: "963 Sand Dune Rd, Phoenix, AZ",
      hostId: "host_013",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_013",
      name: "Lily Evans",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-06-10",
    checkOutDate: "2025-06-15",
    numberOfGuests: 4,
    payment: {
      status: "refunded",
    },
  },
  {
    id: 14,
    propertyId: 114,
    status: "cancelled",
    totalPrice: 900,
    property: {
      name: "Hilltop Mansion",
      address: "852 Hill St, Beverly Hills, CA",
      hostId: "host_014",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_014",
      name: "Noah King",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-07-01",
    checkOutDate: "2025-07-07",
    numberOfGuests: 8,
    payment: {
      status: "refunded",
    },
  },
  {
    id: 15,
    propertyId: 115,
    status: "cancelled",
    totalPrice: 300,
    property: {
      name: "Suburban House",
      address: "741 Main St, Naperville, IL",
      hostId: "host_015",
      imageUrls: [
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
        "https://random-image-pepebigotes.vercel.app/api/random-image",
      ],
    },
    tenant: {
      id: "tenant_015",
      name: "Grace Hill",
      image: "https://avatar.iran.liara.run/public",
    },
    checkInDate: "2025-08-15",
    checkOutDate: "2025-08-20",
    numberOfGuests: 3,
    payment: {
      status: "refunded",
    },
  },
];

export function ReservationList() {
  const [activeTab] = useActiveTab();

  const allReservations = reservations;
  const upcomingList = allReservations.filter(
    (reservation) => reservation.status === "upcoming"
  );
  const completedList = allReservations.filter(
    (reservation) => reservation.status === "completed"
  );
  const cancelledList = allReservations.filter(
    (reservation) => reservation.status === "cancelled"
  );

  const getActiveList = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingList;
      case "completed":
        return completedList;
      case "cancelled":
        return cancelledList;
      default:
        return allReservations;
    }
  };
  const activeList = getActiveList();

  return (
    <ul className="grid grid-cols-1 gap-5">
      {activeList.map((reservation) => (
        <li key={reservation.id}>
          <ReservationCard item={reservation} />
        </li>
      ))}
    </ul>
  );
}

function ReservationCard({ item }: { item: Reservation }) {
  return (
    <article
      className={cn(
        "flex items-center justify-between shadow-md border-2 border-s-8 border-b-4 rounded-lg p-6 relative",
        item.status === "cancelled" && " border-red-200",
        item.status === "completed" && " border-green-200",
        item.status === "upcoming" && " border-blue-200"
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="[--size:--spacing(12)] size-(--size)">
          <AvatarImage src={item.tenant.image} alt={item.tenant.name} />
          <AvatarFallback>
            <Skeleton className="size-(--size)" />
          </AvatarFallback>
        </Avatar>
        <section>
          <h3 className="text-lg font-semibold">{item.tenant.name}</h3>
          <p className="text-sm text-gray-500">{item.property.name}</p>
        </section>
      </div>
      <div className="grid grid-cols-[auto_16ch] items-center justify-items-end gap-2">
        <div className="grid grid-cols-[repeat(4,10ch)] items-center gap-3">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Check-in</span>
            <time className="text-sm">
              {format(item.checkInDate, "MMM d, yyyy")}
            </time>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Check-out</span>
            <time className="text-sm">
              {format(item.checkOutDate, "MMM d, yyyy")}
            </time>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Guests</span>
            <time className="text-sm">
              {makePluralNoun("guest", item.numberOfGuests)}
            </time>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Total</span>
            <time className="text-sm">{formatPrice(item.totalPrice)}</time>
          </div>
        </div>
        {item.status === "upcoming" && (
          <Button variant={"outline"} size={"lg"}>
            Message
          </Button>
        )}
        {item.status === "cancelled" && (
          <div className="text-red-500 font-medium bg-red-50 px-2 py-1 rounded shadow">
            Cancelled
          </div>
        )}
        {item.status === "completed" && (
          <div className="font-medium shadow rounded overflow-clip">
            {item.review ? (
              <span className="text-green-500 bg-green-50 px-2 py-1 flex items-center">
                {item.review.rating}
                <Star className="fill-current stroke-current text-yellow-500 size-3.5 me-1.5 -mb-[1px]" />
                Reviewed
              </span>
            ) : (
              <span className="text-stone-500 bg-stone-50 px-2 py-1 flex">
                Pending Review
              </span>
            )}
          </div>
        )}
      </div>

      {item.payment && (
        <span
          className={cn(
            "absolute top-0 left-6 -translate-y-1/2 text-xs font-medium",
            {
              "text-green-500 bg-green-50 px-2 py-1 rounded shadow":
                item.payment.status === "full-paid",
              "text-blue-500 bg-blue-50 px-2 py-1 rounded shadow":
                item.payment.status === "deposit-paid",
              "text-red-500 bg-red-50 px-2 py-1 rounded shadow":
                item.payment.status === "refunded",
            }
          )}
        >
          {kebabCaseToTitleCase(item.payment.status)}
        </span>
      )}
    </article>
  );
}

const kebabCaseToTitleCase = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
