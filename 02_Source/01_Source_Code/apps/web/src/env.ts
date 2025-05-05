import { createEnv } from "@t3-oss/env-nextjs";
import { type } from "arktype";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_API_GATEWAY_URL: type("string | undefined").pipe(
      (v) => v ?? "http://localhost:3001"
    ),
    NEXT_PUBLIC_APP_URL: type("string | undefined").pipe(
      (v) => v ?? "http://localhost:3000"
    ),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_GATEWAY_URL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
