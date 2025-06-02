import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

import { pool } from "./db.js";
import { mailClient } from "./email.js";

export const ROLES = ["tenant", "admin", "host", "user"] as const;

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await mailClient.sendMail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url} or paste this token: ${token}`,
        html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p><p>or paste this token: ${token}</p>`,
      });
    },
  },
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
  database: pool,
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
