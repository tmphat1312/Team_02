import {
  pgTable,
  integer,
  timestamp,
  pgEnum,
  text,
  decimal,
} from "drizzle-orm/pg-core";

export const reservationStatus = pgEnum("status", [
  "Pending",
  "Confirmed",
  "Paid",
  "Canceled",
]);

export const reservationTable = pgTable("reservations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tenantId: text().notNull(),
  hostId: text().notNull(),
  propertyId: integer().notNull(),
  checkInDate: timestamp().notNull(),
  checkOutDate: timestamp().notNull(),
  numberOfGuests: integer().notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  status: reservationStatus().notNull().default("Pending"),
  note: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const reviewTable = pgTable("reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reservationId: integer().notNull(),
  propertyId: integer().notNull(),
  tenantId: text().notNull(),
  cleanliness: integer().notNull(),
  accuracy: integer().notNull(),
  communication: integer().notNull(),
  location: integer().notNull(),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type NewReservation = typeof reservationTable.$inferInsert;
export type NewReview = typeof reviewTable.$inferInsert;
