import { RecentlyViewed } from "@/app/typings/models";
import { db } from "./db";

export async function populate() {
  await db.recentlyViewedList.clear();
  await db.recentlyViewedList.bulkAdd(POPULATE_DATA);
}

const POPULATE_DATA: RecentlyViewed[] = [
  {
    id: "1",
    propertyId: 17,
    name: "Product 1",
    imageUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    rating: 4.5,
    viewedAt: "2023-10-01T12:00:00Z",
  },
  {
    id: "2",
    propertyId: 17,
    name: "Product 2",
    imageUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    rating: 4.0,
    viewedAt: "2023-10-02T12:00:00Z",
  },
  {
    id: "3",
    propertyId: 12,
    name: "Product 3",
    imageUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    rating: 5.0,
    viewedAt: "2023-10-03T12:00:00Z",
  },
];
