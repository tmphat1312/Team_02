import Dexie, { type EntityTable } from "dexie";

import { RecentlyViewed, Wishlist } from "@/typings/models";

const db = new Dexie("RecentlyViewedDatabase") as Dexie & {
  recentlyViewedList: EntityTable<RecentlyViewed, "id">;
  wishlistList: EntityTable<Wishlist, "id">;
};

db.version(1).stores({
  recentlyViewedList: "++id, propertyId, name, imageUrl, rating, viewedAt",
  wishlistList:
    "++id, propertyId, name, imageUrl, rating, createdAt, updatedAt",
});

export { db };
