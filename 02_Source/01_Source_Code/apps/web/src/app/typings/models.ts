export type Category = {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Amenity = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Property = {
  id: number;
  hostId: string;
  title: string;
  description: string;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  pricePerNight: number;
  location: string;
  numberOfGuests: number;
  numberOfBeds: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  createdAt: string;
  updatedAt: string;
  rating: number;
};

export type Review = {
  id: number;
  tenantId: string;
  propertyId: number;
  cleanliness: number;
  communication: number;
  accuracy: number;
  location: number;
  content: string;
  reviewAt: string;
  createdAt: string;
  updatedAt: string;
};

export type RecentlyViewed = {
  id: string;
  propertyId: number;
  name: string;
  imageUrl: string;
  rating: number;
  viewedAt: string;
};
