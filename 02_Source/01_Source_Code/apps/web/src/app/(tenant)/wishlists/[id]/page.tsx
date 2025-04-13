"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Globe, Heart, Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for wishlists - same as in the main page
const initialWishlists = [
  {
    id: "recently-viewed",
    name: "Recently viewed",
    subtitle: "Today",
    isDefault: true,
    properties: [
      {
        id: "prop1",
        image: "/placeholder.svg?height=300&width=300",
        name: "Cozy Cabin in the Woods",
        location: "Lake Tahoe, California",
        price: "$150 night",
        rating: 4.92,
      },
      {
        id: "prop2",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Villa",
        location: "Cancun, Mexico",
        price: "$320 night",
        rating: 4.85,
      },
      {
        id: "prop3",
        image: "/placeholder.svg?height=300&width=300",
        name: "Modern Downtown Loft",
        location: "New York, NY",
        price: "$210 night",
        rating: 4.78,
      },
      {
        id: "prop4",
        image: "/placeholder.svg?height=300&width=300",
        name: "Mountain View Retreat",
        location: "Aspen, Colorado",
        price: "$275 night",
        rating: 4.95,
      },
    ],
  },
  {
    id: "islands-2025",
    name: "Islands 2025",
    subtitle: "2 saved",
    isDefault: false,
    properties: [
      {
        id: "prop5",
        image: "/placeholder.svg?height=300&width=300",
        name: "Overwater Bungalow",
        location: "Bora Bora, French Polynesia",
        price: "$550 night",
        rating: 4.97,
      },
      {
        id: "prop6",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Paradise",
        location: "Maldives",
        price: "$480 night",
        rating: 4.91,
      },
    ],
  },
  {
    id: "summer-getaways",
    name: "Summer Getaways",
    subtitle: "4 saved",
    isDefault: false,
    properties: [
      {
        id: "prop7",
        image: "/placeholder.svg?height=300&width=300",
        name: "Lakeside Cottage",
        location: "Lake Michigan",
        price: "$195 night",
        rating: 4.88,
      },
      {
        id: "prop8",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Condo",
        location: "Miami, Florida",
        price: "$230 night",
        rating: 4.82,
      },
      {
        id: "prop9",
        image: "/placeholder.svg?height=300&width=300",
        name: "Seaside Villa",
        location: "Amalfi Coast, Italy",
        price: "$350 night",
        rating: 4.94,
      },
      {
        id: "prop10",
        image: "/placeholder.svg?height=300&width=300",
        name: "Tropical Paradise",
        location: "Maui, Hawaii",
        price: "$290 night",
        rating: 4.89,
      },
    ],
  },
];

export default function WishlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any>(null);

  useEffect(() => {
    const foundWishlist = initialWishlists.find((w) => w.id === params.id);
    if (foundWishlist) {
      setWishlist(foundWishlist);
    } else {
      router.push("/");
    }
  }, [params.id, router]);

  if (!wishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{wishlist.name}</h1>
            <p className="text-gray-500">{wishlist.properties.length} saved</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" className="rounded-full mr-2">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {wishlist.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.properties.map((property: any) => (
              <div key={property.id} className="group relative">
                <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white rounded-full text-[#ff385c]"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{property.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm">★ {property.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">{property.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium">No saved properties yet</h3>
            <p className="text-gray-500 mt-2">
              Start saving properties to see them here
            </p>
            <Button className="mt-4 bg-[#ff385c] hover:bg-[#ff385c]/90 rounded-lg">
              Explore Airbnb
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
