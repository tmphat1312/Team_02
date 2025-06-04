import {
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const userWalletsTable = pgTable(
  "userWallets",
  {
    id: serial("id").primaryKey(),
    balance: real("balance").notNull().default(0),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("userWallets_userId_idx").on(table.userId)]
);

export const depositHistoryTable = pgTable("depositHistory", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  amount: real("amount").notNull(),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const paymentStatusEnum = pgEnum("paymentStatus", [
  "DEPOSIT-PAID",
  "FULL-PAID",
  "REFUNDED",
]);

export const paymentHistoryTable = pgTable("paymentHistory", {
  id: serial("id").primaryKey(),
  fromUserId: text("fromUserId").notNull(),
  toUserId: text("toUserId").notNull(),
  reservationId: integer("reservationId").notNull(),
  amount: real("amount").notNull(),
  serviceFee: real("serviceFee"),
  status: paymentStatusEnum("status").notNull().default("DEPOSIT-PAID"),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
