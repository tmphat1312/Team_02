import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth.js";

const ROLES = ["user", "admin"];
type Role = (typeof ROLES)[number];

export function only(roles: Role[]) {
  return createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({
      // @ts-ignore
      headers: { ...c.req.header() },
    });

    if (!session) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAllowed = roles.includes(session.user.role as Role);

    if (!isAllowed) {
      return c.json({ error: "Forbidden" }, { status: 403 });
    }

    return next();
  });
}
