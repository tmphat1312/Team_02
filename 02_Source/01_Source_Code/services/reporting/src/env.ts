import "dotenv/config";

import { env as stdEnv } from "std-env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "REACT_PUBLIC_", // this could be any non-empty string
  client: {},
  server: {
    PORT: z.coerce.number().default(3000),
    PAYMENT_DB_URL: z.string(),
    RESERVATION_DB_URL: z.string(),
    PROPERTY_DB_URL: z.string(),
  },
  runtimeEnv: stdEnv,
  emptyStringAsUndefined: true,
});
