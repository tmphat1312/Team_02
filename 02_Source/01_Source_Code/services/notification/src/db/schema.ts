import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  text,
  integer,
} from 'drizzle-orm/pg-core';
import { pgEnum } from "drizzle-orm/pg-core";

export const notificationTypeEnum = pgEnum("notificationType", ["in-app", "email"]);


export const notificationTable = pgTable('notifications', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar('userId', { length: 255 }).notNull(),
  title: text('title'),
  message: text('message'),
  type: notificationTypeEnum('type').notNull(),
  sendAt: timestamp('sendAt').notNull().defaultNow(),
  isRead: boolean('isRead').default(false),
});
