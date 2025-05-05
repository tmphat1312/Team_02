import { eq, getTableColumns, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  pgView,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

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

export const ruleTypeEnum = pgEnum("type", ["common", "custom"]);

export const rulesTable = pgTable("rules", {
  ...baseColumns,
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  type: ruleTypeEnum().default("custom"),
});

export const propertiesTable = pgTable("properties", {
  ...baseColumns,
  hostId: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  address: varchar({ length: 255 }).notNull(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  pricePerNight: decimal({ precision: 15, scale: 2 }).notNull(),
  numberOfGuests: integer().notNull(),
  numberOfBedrooms: integer().notNull(),
  numberOfBeds: integer().notNull(),
  numberOfBathrooms: integer().notNull(),
  isAvailable: boolean().notNull().default(true),
});

export const propertyImagesTable = pgTable("property_images", {
  ...baseColumns,
  propertyId: integer()
    .notNull()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),
  imageUrl: text().notNull(),
});

export const propertyCategoriesTable = pgTable(
  "property_categories",
  {
    ...baseColumns,
    propertyId: integer()
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),
    categoryId: integer()
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.propertyId, t.categoryId)]
);

export const propertyAmenitiesTable = pgTable(
  "property_amenities",
  {
    ...baseColumns,
    propertyId: integer()
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),
    amenityId: integer()
      .notNull()
      .references(() => amenitiesTable.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.propertyId, t.amenityId)]
);

export const propertyRulesTable = pgTable(
  "property_rules",
  {
    ...baseColumns,
    propertyId: integer()
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),
    ruleId: integer()
      .notNull()
      .references(() => rulesTable.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.propertyId, t.ruleId)]
);

export const wishlistsTable = pgTable(
  "wishlists",
  {
    ...baseColumns,
    tenantId: varchar({ length: 255 }).notNull(),
    propertyId: integer()
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.tenantId, t.propertyId)]
);

const { ...propertyColumns } = getTableColumns(propertiesTable);

export const propertiesWithImagesView = pgView("properties_with_images").as(
  (qb) =>
    qb
      .select({
        ...propertyColumns,
        imageUrls: sql`array_agg(${propertyImagesTable.imageUrl})`.as(
          "imageUrls"
        ),
      })
      .from(propertiesTable)
      .leftJoin(
        propertyImagesTable,
        eq(propertyImagesTable.propertyId, propertiesTable.id)
      )
      .groupBy(propertiesTable.id)
);
