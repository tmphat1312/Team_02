import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3007),
    DATABASE_URL: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
