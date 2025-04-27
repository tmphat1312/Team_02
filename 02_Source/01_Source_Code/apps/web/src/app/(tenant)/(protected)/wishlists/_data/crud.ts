import { RecentlyViewed, Wishlist } from "@/app/typings/models";
import { db } from "./db";

export async function deleteRecentlyViewed(id: string) {
  return await db.recentlyViewedList.delete(id);
}

export async function getRecentlyViewed() {
  const recentlyViewedList = await db.recentlyViewedList.toArray();
  return recentlyViewedList;
}

export async function checkIfRecentlyViewedExists(propertyId: number) {
  const recentlyViewedList = await db.recentlyViewedList
    .where("propertyId")
    .equals(propertyId)
    .toArray();
  return recentlyViewedList.length > 0;
}

export async function addRecentlyViewed(item: Omit<RecentlyViewed, "id">) {
  const willBeAddedItem = {
    id: crypto.randomUUID(),
    ...item,
  };
  return await db.recentlyViewedList.add(willBeAddedItem);
}

export async function deleteWishlist(id: string) {
  return await db.wishlistList.delete(id);
}

export async function deleteWishlistByPropertyId(propertyId: number) {
  return await db.wishlistList.where("propertyId").equals(propertyId).delete();
}

export async function getWishlists() {
  const wishlistList = await db.wishlistList.toArray();
  return wishlistList;
}

export async function checkIfWishlistExists(propertyId: number) {
  const wishlistList = await db.wishlistList
    .where("propertyId")
    .equals(propertyId)
    .toArray();
  return wishlistList.length > 0;
}

export async function addWishlist(
  item: Omit<Wishlist, "id" | "createdAt" | "updatedAt">
) {
  const willBeAddedItem = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...item,
  };
  return await db.wishlistList.add(willBeAddedItem);
}
