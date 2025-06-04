import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export const db = drizzle(neon(Bun.env.DATABASE_URL!));
