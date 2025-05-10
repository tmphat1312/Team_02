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

export type Rule = {
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
  address: string;
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

export type Wishlist = {
  id: string;
  propertyId: number;
  name: string;
  imageUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null | undefined;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWallet = {
  id: number;
  userId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DepositHistory = {
  id: number;
  userId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentHistory = {
  id: number;
  userId: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Trip = {
  id: number;
  propertyId: number;
  status: "upcoming" | "completed" | "cancelled";
  totalPrice: number;
  property: {
    name: string;
    address: string;
    hostId: string;
    imageUrls: string[];
    host: {
      name: string;
      image: string;
    };
  };
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
};

export type Reservation = {
  id: number;
  propertyId: number;
  status: "upcoming" | "completed" | "cancelled";
  totalPrice: number;
  property: {
    name: string;
    address: string;
    hostId: string;
    imageUrls: string[];
  };
  tenant: {
    id: string;
    name: string;
    image: string;
  };
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  review?: {
    rating: number;
  } | null;
  payment?: {
    status: "deposit-paid" | "full-paid" | "refunded";
  };
};
