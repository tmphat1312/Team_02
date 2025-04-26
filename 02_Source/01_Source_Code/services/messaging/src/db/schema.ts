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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdateFn(() => sql`current_timestamp`),
} as const


export const conversationTable = pgTable('conversations', {
  ...baseColumns,
  tenantId: varchar('tenantId', { length: 255 }).notNull(),
  hostId: varchar('hostId', { length: 255 }).notNull(),
  propertyId: integer('propertyId').notNull(),
})


export const messageTable = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversationId: integer('conversationId').notNull(),
  senderId: varchar('senderId', { length: 255 }).notNull(),
  receiverId: varchar('receiverId', { length: 255 }).notNull(),
  content: text('content'),
  sendAt: timestamp('sendAt').notNull().defaultNow(),
  isReadByReceiver: boolean('isReadByReceiver').default(false),
})
