import { createMiddleware } from "hono/factory";
import { auth, ROLES } from "../lib/auth.js";
import { forbidden, unauthorized } from "../utils/json-helpers.js";

type Role = (typeof ROLES)[number];

export function only(roles: Role[]) {
  return createMiddleware(async (c, next) => {
    // 1. Check if the request is authenticated
    const session = await auth.api.getSession({
      // @ts-ignore
      headers: { ...c.req.header() },
    });

    if (!session) {
      return unauthorized(c);
    }

    // 2. Check if the user has the required role
    const isAllowed = roles.includes(session.user.role as Role);

    if (!isAllowed) {
      return forbidden(c, "You don't have permission to access this resource");
    }

    return next();
  });
}
