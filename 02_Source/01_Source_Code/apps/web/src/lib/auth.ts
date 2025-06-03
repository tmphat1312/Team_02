import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_GATEWAY_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        phoneNumber: {
          type: "string",
          required: false,
        },
        address: {
          type: "string",
          required: false,
        },
      },
    }),
    adminClient(),
  ],
});
