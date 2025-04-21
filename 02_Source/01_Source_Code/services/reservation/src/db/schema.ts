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
    note: text(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});
