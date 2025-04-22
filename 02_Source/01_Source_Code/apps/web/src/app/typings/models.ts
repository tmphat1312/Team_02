export type Category = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Amenity = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Property = {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  price: number;
};
