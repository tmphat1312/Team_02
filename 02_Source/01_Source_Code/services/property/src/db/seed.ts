import { consola } from "consola";
import { sql } from "drizzle-orm";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import { db } from "./";
import { amenitiesTable, categoriesTable, rulesTable } from "./schema";

import categories from "./data/categories.json";
import amenities from "./data/amenities.json";
import commonRules from "./data/common-rules.json";

const execPromise = promisify(exec);

async function dropTables() {
  await Promise.all([
    // db.execute(sql`DROP TABLE IF EXISTS property_categories CASCADE`),
    // db.execute(sql`DROP TABLE IF EXISTS property_amenities CASCADE`),
    // db.execute(sql`DROP TABLE IF EXISTS property_rules CASCADE`),

    db.execute(sql`DROP TABLE IF EXISTS categories CASCADE`),
    db.execute(sql`DROP TABLE IF EXISTS amenities CASCADE`),
    db.execute(sql`DROP TABLE IF EXISTS rules CASCADE`),
  ]);
}

async function insertSeedData() {
  await Promise.all([
    db.insert(categoriesTable).values(categories),
    db.insert(amenitiesTable).values(amenities),

    db.insert(rulesTable).values(
      commonRules.map((rule) => ({
        ...rule,
        type: "common" as const,
      }))
    ),
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
