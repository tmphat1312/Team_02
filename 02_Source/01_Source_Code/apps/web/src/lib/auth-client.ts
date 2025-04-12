import { env } from "@/env";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [adminClient()],
});
