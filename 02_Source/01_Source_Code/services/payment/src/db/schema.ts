import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const baseColumns = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => sql`current_timestamp`),
} as const;

export const walletsTable = pgTable("wallets", {
  ...baseColumns,
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  balance: numeric("balance").notNull().default(0),
});

export const paymentsTable = pgTable("payments", {
  ...baseColumns,
  userId: varchar("user_id", { length: 255 }).notNull(),
  reservationId: integer("reservation_id").notNull().unique(),
  amount: numeric("amount").notNull(),
  serviceFee: numeric("service_fee").notNull(),
  status: varchar("status", { length: 255 }).notNull(),
});