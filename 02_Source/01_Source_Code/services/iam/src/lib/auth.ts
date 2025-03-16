import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import pg from "pg";

import { env } from "../../env.js";
import {
  ac as accessControl,
  admin as adminRole,
  guest as guestRole,
  host as hostRole,
  tenant as tenantRole,
} from "../auth/permissions.js";

export const auth = betterAuth({
  database: new pg.Pool({
    connectionString: env.get("DATABASE_URL"),
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
      ac: accessControl,
      roles: {
        admin: adminRole,
        host: hostRole,
        tenant: tenantRole,
        guest: guestRole,
      },
    }),
  ],
});
