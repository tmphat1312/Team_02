import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import pg from "pg";

export const ROLES = ["user", "admin", "host"] as const;

export const auth = betterAuth({
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
  },
  user: {
    additionalFields: {
      isHost: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
  trustedOrigins: [process.env.WEB_APP_URL!, process.env.ADMIN_APP_URL!],
  secret: process.env.BETTER_AUTH_SECRET!,
});
