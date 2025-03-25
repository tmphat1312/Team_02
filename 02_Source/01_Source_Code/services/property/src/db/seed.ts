import { consola } from "consola";
import {
  randFilePath,
  randProductCategory,
  randProductDescription,
  randProductMaterial,
} from "@ngneat/falso";

import { db } from "./";
import {
  amenitiesTable,
  categoriesTable,
  propertiesTable,
  propertyAmenitiesTable,
  propertyCategoriesTable,
} from "./schema";

const categories = Array.from({ length: 5_000 }, (_, i) => ({
  name: randProductCategory() + i + randProductMaterial(),
  description: randProductDescription(),
  imagePath: randFilePath(),
}));

const amenities = [
  {
    name: "Pool",
    description: "Swimming pool",
    imagePath: "/images/pool.jpg",
  },
  {
    name: "Gym",
    description: "Fitness center",
    imagePath: "/images/gym.jpg",
  },
  {
    name: "Parking",
    description: "Parking space",
    imagePath: "/images/parking.jpg",
  },
];

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
    const seededCategories = await db
      .insert(categoriesTable)
      .values(categories)
      .returning({
        id: categoriesTable.id,
      })
      .onConflictDoNothing();
    const seededAmenities = await db
      .insert(amenitiesTable)
      .values(amenities)
      .returning({
        id: amenitiesTable.id,
      });
    const seededProperties = await db
      .insert(propertiesTable)
      .values(properties)
      .returning({
        id: propertiesTable.id,
      });

    consola.success("Database seeded successfully");
  }).catch((error) => {
    consola.error("Error seeding database", error);
  });
}

seedDatabase();
