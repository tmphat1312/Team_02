import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL ?? 'http://localhost:3001',
  plugins: [adminClient()],
});
