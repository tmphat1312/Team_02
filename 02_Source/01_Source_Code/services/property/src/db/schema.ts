import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const baseColumns = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => sql`current_timestamp`),
} as const;

export const categoriesTable = pgTable("categories", {
  ...baseColumns,
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }),
  imagePath: varchar({ length: 255 }).notNull(),
});

export const amenitiesTable = pgTable("amenities", {
  ...baseColumns,
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  imagePath: varchar({ length: 255 }).notNull(),
});

export const propertiesTable = pgTable("properties", {
  ...baseColumns,
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
});

export const propertyAmenitiesTable = pgTable("property_amenities", {
  propertyId: integer()
    .notNull()
    .references(() => propertiesTable.id),
  amenityId: integer()
    .notNull()
    .references(() => amenitiesTable.id),
});

export const propertyCategoriesTable = pgTable("property_categories", {
  propertyId: integer()
    .notNull()
    .references(() => propertiesTable.id),
  categoryId: integer()
    .notNull()
    .references(() => categoriesTable.id),
});
