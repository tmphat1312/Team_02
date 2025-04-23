export type Category = {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Amenity = {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
  rating: number;
};
