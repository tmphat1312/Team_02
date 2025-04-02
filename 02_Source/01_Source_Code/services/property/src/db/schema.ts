import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
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
  type: ruleTypeEnum().default("common"),
});
