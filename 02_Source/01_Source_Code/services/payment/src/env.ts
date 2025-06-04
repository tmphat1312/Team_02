import "dotenv/config";

import { env as stdEnv } from "std-env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "ENV_PUBLIC_",
  client: {},
  server: {
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default("http://localhost"),
    WEB_HOST: z.string().default("http://localhost:3000"),
    VNPAY_TMN_CODE: z.string().min(1, "VNPAY_TMN_CODE is required"),
    VNPAY_SECURE_SECRET: z.string().min(1, "VNPAY_SECURE_SECRET is required"),
    VNPAY_HOST: z.string().url().default("https://sandbox.vnpayment.vn"),
    VNPAY_TEST_MODE: z.coerce.boolean().default(true),
    DATABASE_URL: z.string(),
  },
  runtimeEnv: stdEnv,
  emptyStringAsUndefined: true,
});
