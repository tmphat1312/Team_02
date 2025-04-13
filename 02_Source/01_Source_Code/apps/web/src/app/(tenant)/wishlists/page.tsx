"use client";

import { useState } from "react";
import { Globe, Menu, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for wishlists
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
      },
      {
        id: "prop2",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Villa",
        location: "Cancun, Mexico",
      },
      {
        id: "prop3",
        image: "/placeholder.svg?height=300&width=300",
        name: "Modern Downtown Loft",
        location: "New York, NY",
      },
      {
        id: "prop4",
        image: "/placeholder.svg?height=300&width=300",
        name: "Mountain View Retreat",
        location: "Aspen, Colorado",
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
      },
      {
        id: "prop6",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Paradise",
        location: "Maldives",
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
      },
      {
        id: "prop8",
        image: "/placeholder.svg?height=300&width=300",
        name: "Beachfront Condo",
        location: "Miami, Florida",
      },
      {
        id: "prop9",
        image: "/placeholder.svg?height=300&width=300",
        name: "Seaside Villa",
        location: "Amalfi Coast, Italy",
      },
      {
        id: "prop10",
        image: "/placeholder.svg?height=300&width=300",
        name: "Tropical Paradise",
        location: "Maui, Hawaii",
      },
    ],
  },
];

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState(initialWishlists);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      const newWishlist = {
        id: `wishlist-${Date.now()}`,
        name: newWishlistName,
        subtitle: "0 saved",
        isDefault: false,
        properties: [],
      };
      setWishlists([...wishlists, newWishlist]);
      setNewWishlistName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Wishlists</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-[#ff385c] hover:bg-[#ff385c]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create wishlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create wishlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter wishlist name"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#ff385c] hover:bg-[#ff385c]/90"
                    onClick={handleCreateWishlist}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <div key={wishlist.id} className="group relative">
              <Link href={`/wishlists/${wishlist.id}`}>
                <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {wishlist.properties.length > 0 ? (
                    <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-square">
                      {wishlist.properties
                        .slice(0, 4)
                        .map((property, index) => (
                          <div
                            key={property.id}
                            className={`relative ${
                              index === 0 && wishlist.properties.length >= 3
                                ? "col-span-1 row-span-2"
                                : wishlist.properties.length === 1
                                ? "col-span-2 row-span-2"
                                : wishlist.properties.length === 2
                                ? "col-span-1 row-span-2"
                                : ""
                            }`}
                          >
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 aspect-square flex items-center justify-center">
                      <Plus className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{wishlist.name}</h3>
                    <p className="text-gray-500 text-sm">{wishlist.subtitle}</p>
                  </div>
                </div>
              </Link>
              {!wishlist.isDefault && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setWishlists(wishlists.filter((w) => w.id !== wishlist.id));
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
