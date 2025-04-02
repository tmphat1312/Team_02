import { amenitiesTable, categoriesTable } from "../db/schema";
import { resourceFactory } from "../utils/resource-factory";

const amenityResources =
  resourceFactory<typeof amenitiesTable.$inferSelect>(amenitiesTable);
const categoryResources =
  resourceFactory<typeof categoriesTable.$inferSelect>(categoriesTable);

export const Query = {
  amenities: amenityResources.index,
  categories: categoryResources.index,
};

export const Mutation = {};
