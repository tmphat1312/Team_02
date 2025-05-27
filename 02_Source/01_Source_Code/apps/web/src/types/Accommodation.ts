export default interface Accommodation {
  id: number;
  title: string;
  description: string;
  location: string;
  locationPoint: {
    lat: number;
    lon: number;
  }
  pricePerNight: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  guests: number;
  amenities: Amenity[];
  propertyType: string;
  propertyImages: PropertyImage[];
}

export interface Amenity {
  name: string;
  description: string;
  image: string;
}

export interface PropertyImage {
  imageUrl: string;
}