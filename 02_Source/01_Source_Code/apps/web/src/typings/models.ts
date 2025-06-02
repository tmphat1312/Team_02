type Nullable<T> = T | null;

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
  rating: Nullable<number>;
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
  createdAt: string;
  updatedAt: string;
};

export type ReviewWithTenant = Review & {
  tenant: User;
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

export type Reservation = {
  id: number;
  tenantId: string;
  hostId: string;
  propertyId: number;
  status: "Pending" | "Confirmed" | "Paid" | "Canceled" | "Refunded";
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  note: Nullable<string>;
};

export type Trip = Reservation & {
  property: Property & {
    host: User;
  };
  review: Nullable<Review>;
};

export type ManagedReservation = Reservation & {
  property: Property;
  tenant: User;
  review: Nullable<Review>;
};

export type PropertyWithReviews = Property & {
  reviews: {
    rating: number;
    numberOfReviews: number;
  };
};

export type ReservedDate = {
  reservationId: number;
  startDate: string;
  endDate: string;
  tenantId: string;
};

export type Notification = {
  id: number;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sendAt: string;
  readAt: Nullable<string>;
};

export type UserWallet = {
  id: number;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type UserDepositHistory = {
  id: number;
  userId: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPaymentHistory = {
  id: number;
  fromUserId: string;
  toUserId: string;
  amount: number;
  serviceFee: number;
  date: string;
  reservationId: number;
  status: "DEPOSIT-PAID" | "FULL-PAID" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
};

export type HostNumbers = {
  hostId: string;
  numberOfListings: number;
  numberOfReservations: number;
  totalRevenue: number;
  numberOfListingsByMonth: { month: string; value: number }[];
  numberOfReservationsByMonth: { month: string; value: number }[];
  revenueByMonth: { month: string; value: number }[];
};

export type HostListingRevenue = {
  id: number;
  listingId: number;
  title: string;
  numberOfReservations: number;
  totalRevenue: number;
  };
