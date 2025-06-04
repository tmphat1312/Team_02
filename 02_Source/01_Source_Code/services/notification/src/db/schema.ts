import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const notificationsTable = pgTable("notifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 255 }).notNull(),
  title: text("title"),
  message: text("message"),
  isRead: boolean("isRead").default(false),
  sendAt: timestamp("sendAt").notNull().defaultNow(),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});
