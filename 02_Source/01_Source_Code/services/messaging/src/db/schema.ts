import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  text,
  integer
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

const baseColumns = {
  id: integer().primaryKey(),//.generatedAlwaysAsIdentity(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdateFn(() => sql`current_timestamp`),
} as const


// 💬 Conversation Table
export const conversationTable = pgTable('conversations', {
  ...baseColumns,
  tenantId: varchar('tenantId', { length: 255 }).notNull(),
  hostId: varchar('hostId', { length: 255 }).notNull(),
  propertyId: integer('propertyId').notNull(),
})

// 📨 Message Table
export const messageTable = pgTable('messages', {
  id: integer().primaryKey(), //.generatedAlwaysAsIdentity(),
  conversationId: varchar('conversationId', { length: 255 }).notNull(),
  senderId: varchar('senderId', { length: 255 }).notNull(),
  receiverId: varchar('receiverId', { length: 255 }).notNull(),
  content: text('text'),
  readBy: boolean('readByHost').default(false),
  sendAt: timestamp('sendAt').notNull().defaultNow(),
  isReadByReceiver: boolean('isReadByReceiver').default(false),
})
