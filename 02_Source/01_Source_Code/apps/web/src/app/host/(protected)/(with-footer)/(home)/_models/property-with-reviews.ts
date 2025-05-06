export type PropertyWithReviews = {
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
  reviews: {
    rating: number;
    numberOfReviews: number;
  };
};
