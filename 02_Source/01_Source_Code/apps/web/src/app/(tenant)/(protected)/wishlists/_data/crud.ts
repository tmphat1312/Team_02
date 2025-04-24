import { RecentlyViewed } from "@/app/typings/models";
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
