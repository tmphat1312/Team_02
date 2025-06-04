import { pgTable, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const baseColumns = {
	id: varchar('id', { length: 255 }).primaryKey(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().$onUpdateFn(() => sql`current_timestamp`),
} as const;  

export const userTable = pgTable('user', {
  ...baseColumns,
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: boolean('emailVerified'),
  image: varchar('image', { length: 255 }),
  role: varchar('role', { length: 255 }),
  banned: boolean('banned'),
  banReason: varchar('banReason', { length: 255 }),
  banExpires: timestamp('banExpires', { mode: 'date' }),
  isHost: boolean('isHost'),
});


export const sessionTable = pgTable('session', {
	...baseColumns,
  expiresAt: timestamp('expiresAt', { mode: 'date' }),
  token: varchar('token', { length: 255 }).unique(),
  ipAddress: varchar('ipAddress', { length: 255 }),
  userAgent: varchar('userAgent', { length: 255 }),
  userId: varchar('userId', { length: 255 }),
  impersonatedBy: varchar('impersonatedBy', { length: 255 }),
});


export const accountTable = pgTable('account', {
	...baseColumns,
  accountId: varchar('accountId', { length: 255 }),
  providerId: varchar('providerId', { length: 255 }),
  userId: varchar('userId', { length: 255 }),
  accessToken: varchar('accessToken', { length: 255 }),
  refreshToken: varchar('refreshToken', { length: 255 }),
  idToken: varchar('idToken', { length: 255 }),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { mode: 'date' }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { mode: 'date' }),
  scope: varchar('scope', { length: 255 }),
  password: varchar('password', { length: 255 }),
});


export const verificationTable = pgTable('verification', {
  ...baseColumns,
  identifier: varchar('identifier', { length: 255 }),
  value: varchar('value', { length: 255 }),
  expiresAt: timestamp('expiresAt', { mode: 'date' }),
});
