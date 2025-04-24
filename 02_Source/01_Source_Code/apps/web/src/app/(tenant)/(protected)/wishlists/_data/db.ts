import Dexie, { type EntityTable } from "dexie";

import { RecentlyViewed } from "@/app/typings/models";

const db = new Dexie("RecentlyViewedDatabase") as Dexie & {
  recentlyViewedList: EntityTable<RecentlyViewed, "id">;
};

db.version(1).stores({
  recentlyViewedList: "++id, propertyId, name, imageUrl, rating, viewedAt",
});

export { db };
