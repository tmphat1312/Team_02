import { betterAuth } from "better-auth";
import pg from "pg";
import { env } from "../../env.js";

export const auth = betterAuth({
  database: new pg.Pool({
    connectionString: env.get("DATABASE_URL"),
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },
});
