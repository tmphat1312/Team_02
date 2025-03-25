import { createAuthClient } from 'better-auth/react';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: import.meta.env?.VITE_AUTH_URL ?? 'http://localhost:3001',
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        isHost: {
          type: 'boolean',
          required: false,
        },
      },
    }),
  ],
});
