import { pgTable, integer, timestamp,  pgEnum, text, decimal } from "drizzle-orm/pg-core";

export const statusReservation = pgEnum('status',['Pending', 'Confirmed', 'Paid', 'Canceled'])

export const reservationTable = pgTable("reservations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tenantId: text().notNull(),
    hostId: text().notNull(),                
    propertyId: integer().notNull(),
    checkInDate: timestamp().notNull(),
    checkOutDate: timestamp().notNull(),
    numberOfAdults: integer().notNull(),
    numberOfChildren: integer(),
    numberOfInfants: integer(),
    totalPrice: decimal('totalPrice',{ precision: 10, scale: 2 }).notNull(),
    status: statusReservation().notNull().default('Pending'),
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
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
})

