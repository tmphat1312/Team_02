import { amenitiesTable, categoriesTable, rulesTable } from "../db/schema";
import { resourceFactory } from "../utils/resource-factory";

const amenityResources =
  resourceFactory<typeof amenitiesTable.$inferSelect>(amenitiesTable);
const categoryResources =
  resourceFactory<typeof categoriesTable.$inferSelect>(categoriesTable);
const ruleResources =
  resourceFactory<typeof rulesTable.$inferSelect>(rulesTable);

export const Query = {
  amenities: amenityResources.index,
  categories: categoryResources.index,
  rules: ruleResources.index,
};

export const Mutation = {};
