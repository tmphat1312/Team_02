import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import pg from "pg";

export const ROLES = ["tenant", "admin", "host"] as const;

export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
      defaultRole: "tenant",
    }),
  ],
  trustedOrigins: [process.env.WEB_APP_URL!, process.env.ADMIN_APP_URL!],
  secret: process.env.BETTER_AUTH_SECRET!,
});
