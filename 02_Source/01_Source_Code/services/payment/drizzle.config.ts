import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { env } from "std-env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
