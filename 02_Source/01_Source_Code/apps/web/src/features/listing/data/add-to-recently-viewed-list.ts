import {
  addRecentlyViewed,
  checkIfRecentlyViewedExists,
} from "@/app/(user)/wishlists/data/crud";
import { RecentlyViewed } from "@/typings/models";

export async function addToRecentlyViewedList(
  item: Omit<RecentlyViewed, "id">
) {
  const alreadyExists = await checkIfRecentlyViewedExists(item.propertyId);

  if (!alreadyExists) {
    return await addRecentlyViewed(item);
  }
  console.log("hello?");
}
