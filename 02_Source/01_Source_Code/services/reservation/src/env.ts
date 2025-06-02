import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    PORT: z.string().transform((val) => parseInt(val)),
    NOTIFICATION_SERVICE_URL: z.string(),
    PAYMENT_SERVICE_URL: z.string(),
  },
  runtimeEnv: Bun.env,
  emptyStringAsUndefined: true,
});
