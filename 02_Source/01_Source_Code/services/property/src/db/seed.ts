import { consola } from "consola";

import { db } from "./";
import { amenitiesTable, categoriesTable, rulesTable } from "./schema";

import categories from "./data/categories.json";
import amenities from "./data/amenities.json";
import commonRules from "./data/common-rules.json";

async function seedDatabase() {
  await Promise.try(async () => {
    await db.delete(amenitiesTable);
    await db.delete(categoriesTable);
    await db.delete(rulesTable);
  }).catch((error) => {
    consola.error("Error deleting tables", error);
  });

  await Promise.try(async () => {
    await Promise.all([
      db.insert(categoriesTable).values(categories),
      db.insert(amenitiesTable).values(amenities),
      db.insert(rulesTable).values(commonRules),
    ]);

    consola.success("Database seeded successfully");
  }).catch((error) => {
    consola.error("Error seeding database", error);
  });
}

seedDatabase();
