import { amenitiesTable, categoriesTable, propertiesTable } from "../db/schema";
import { resourceFactory } from "../utils/resource-factory";

const amenityResources =
  resourceFactory<typeof amenitiesTable.$inferSelect>(amenitiesTable);
const categoryResources =
  resourceFactory<typeof categoriesTable.$inferSelect>(categoriesTable);
const propertyResources =
  resourceFactory<typeof propertiesTable.$inferSelect>(propertiesTable);

export const Query = {
  amenities: amenityResources.index,
  categories: categoryResources.index,
  properties: propertyResources.index,
};

export const Mutation = {};
