import {
  addRecentlyViewed,
  checkIfRecentlyViewedExists,
} from "@/app/(tenant)/(protected)/wishlists/_data/crud";
import { RecentlyViewed } from "@/app/typings/models";

export async function addToRecentlyViewedList(
  item: Omit<RecentlyViewed, "id">
) {
  const alreadyExists = await checkIfRecentlyViewedExists(item.propertyId);

  if (!alreadyExists) {
    return await addRecentlyViewed(item);
  }
  console.log("hello?");
}
