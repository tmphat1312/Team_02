import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "@/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        isHost: {
          type: "boolean",
          required: false,
        },
      },
    }),
  ],
});
