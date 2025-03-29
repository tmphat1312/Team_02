import { db } from "../db";
import { amenitiesTable } from "../db/schema";

export const Query = {
  amenities: async () => {
    const results = await db.select().from(amenitiesTable);
    return results;
  },
};

export const Mutation = {};
