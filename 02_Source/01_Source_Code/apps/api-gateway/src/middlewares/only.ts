import { createMiddleware } from "hono/factory";
import { auth, ROLES } from "../lib/auth.js";
import { forbidden, unauthorized } from "../utils/json-helpers.js";
import type { User } from "better-auth";

type Role = (typeof ROLES)[number];
type Variables = {
  user: User;
};

export function only(roles: Role[]) {
  return createMiddleware<{ Variables: Variables }>(async (c, next) => {
    // 1. Check if the request is authenticated
    const session = await auth.api.getSession(c.req.raw);

    if (!session) {
      return unauthorized(c);
    }

    // 2. Check if the user has the required role
    const isAllowed = roles.includes(session.user.role as Role);

    if (!isAllowed) {
      return forbidden(c, "You don't have permission to access this resource.");
    }

    // 3. Set the user in the context
    c.set("user", session.user);

    return next();
  });
}
