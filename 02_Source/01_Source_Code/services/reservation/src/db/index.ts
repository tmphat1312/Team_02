import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from "./schema";

const sql = neon(Bun.env.DATABASE_URL!);
const db = drizzle(sql);

export default db;

export type NewReservation = typeof schema.reservationTable.$inferInsert;
