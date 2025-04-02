import { consola } from "consola";

import { db } from "./";
import {
  amenitiesTable,
  categoriesTable,
  propertiesTable,
  propertyAmenitiesTable,
  propertyCategoriesTable,
} from "./schema";

import categories from "./data/categories.json";
import amenities from "./data/amenities.json";

const properties = [
  {
    title: "Modern Villa",
    description: "Spacious and modern villa",
    price: 500000,
  },
  {
    title: "Cozy Apartment",
    description: "Comfortable urban apartment",
    price: 300000,
  },
  {
    title: "Luxury Mansion",
    description: "Exquisite mansion with all amenities",
    price: 1500000,
  },
];

async function seedDatabase() {
  await Promise.try(async () => {
    await db.delete(propertyAmenitiesTable);
    await db.delete(propertyCategoriesTable);
    await db.delete(propertiesTable);
    await db.delete(amenitiesTable);
    await db.delete(categoriesTable);
  }).catch((error) => {
    consola.error("Error deleting tables", error);
  });

  await Promise.try(async () => {
    await Promise.all([
      db
        .insert(categoriesTable)
        .values(categories)
        .returning({
          id: categoriesTable.id,
        })
        .onConflictDoNothing(),
      db.insert(amenitiesTable).values(amenities).returning({
        id: amenitiesTable.id,
      }),
      db.insert(propertiesTable).values(properties).returning({
        id: propertiesTable.id,
      }),
    ]);

    consola.success("Database seeded successfully");
  }).catch((error) => {
    consola.error("Error seeding database", error);
  });
}

seedDatabase();
