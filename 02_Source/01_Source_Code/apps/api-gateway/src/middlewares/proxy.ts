import { createMiddleware } from "hono/factory";
import { proxy } from "hono/proxy";

import { isEmptyObject } from "../utils/is-empty-object.js";

export function proxyMiddleware({ target }: { target: string }) {
  return createMiddleware((c) => {
    const query = c.req.query();
    const proxiedQuery = isEmptyObject(query)
      ? ""
      : `?${new URLSearchParams(query)}`;

    const user = c.get("user") as { id?: string };

    const headers = {
      ...c.req.header(),
      ...(user?.id ? { "x-user-id": user.id } : {}),
    };

    return proxy(`${target}${c.req.path}${proxiedQuery}`, {
      ...c.req,
      headers,
    });
  });
}
