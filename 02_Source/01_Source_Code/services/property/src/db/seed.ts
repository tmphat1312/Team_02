import { consola } from "consola";
import { sql } from "drizzle-orm";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import { db } from "./";
import {
  amenitiesTable,
  categoriesTable,
  rulesTable,
  propertiesTable,
  propertyImagesTable,
  propertyCategoriesTable,
  propertyAmenitiesTable,
  propertyRulesTable,
} from "./schema";

import categories from "./data/categories.json";
import amenities from "./data/amenities.json";
import commonRules from "./data/common-rules.json";
import customRules from "./data/custom-rules.json";
import properties from "./data/properties.json";
import propertyImages from "./data/property-images.json";
import propertyCategories from "./data/property-categories.json";
import propertyAmenities from "./data/property-amenities.json";
import propertyRules from "./data/property-rules.json";

const execPromise = promisify(exec);

async function dropTables() {
  await db.execute(sql`DROP TABLE IF EXISTS categories CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS amenities CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS rules CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS properties CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS property_images CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS property_categories CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS property_amenities CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS property_rules CASCADE`);
}

async function insertSeedData() {
  await db.insert(rulesTable).values(
    commonRules.map((rule) => ({
      ...rule,
      type: "common" as const,
    }))
  );

  await db.insert(rulesTable).values(
    customRules.map((rule) => ({
      ...rule,
      type: "custom" as const,
    }))
  );

  await Promise.all([
    db.insert(categoriesTable).values(categories),
    db.insert(amenitiesTable).values(amenities),
    db.insert(propertiesTable).values(properties),
  ]);

  await Promise.all([
    db.insert(propertyImagesTable).values(propertyImages),
    db.insert(propertyCategoriesTable).values(propertyCategories),
    db.insert(propertyAmenitiesTable).values(propertyAmenities),
    db.insert(propertyRulesTable).values(propertyRules),
  ]);
}

async function seedDatabase() {
  try {
    await dropTables();
    await execPromise("bunx drizzle-kit push");
    await insertSeedData();

    consola.success("Database seeded successfully");
  } catch (error) {
    consola.error("Error seeding database: ", error);
  }
}

seedDatabase();
