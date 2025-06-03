import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { env } from "std-env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
