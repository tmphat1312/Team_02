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
  imageUrl: varchar({ length: 255 }).notNull(),
});

export const amenitiesTable = pgTable("amenities", {
  ...baseColumns,
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
});

export const propertiesTable = pgTable("properties", {
  ...baseColumns,
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
});

export const propertyAmenitiesTable = pgTable("propertyAmenities", {
  propertyId: integer()
    .notNull()
    .references(() => propertiesTable.id, {
      onDelete: "cascade",
    }),
  amenityId: integer()
    .notNull()
    .references(() => amenitiesTable.id, {
      onDelete: "cascade",
    }),
});

export const propertyCategoriesTable = pgTable("propertyCategories", {
  propertyId: integer()
    .notNull()
    .references(() => propertiesTable.id, {
      onDelete: "cascade",
    }),
  categoryId: integer()
    .notNull()
    .references(() => categoriesTable.id, {
      onDelete: "cascade",
    }),
});
