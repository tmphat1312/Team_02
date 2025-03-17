import { createMiddleware } from "hono/factory";
import { proxy } from "hono/proxy";

export function proxyMiddleware({ target }: { target: string }) {
  return createMiddleware((c) => {
    return proxy(`${target}${c.req.path}`, {
      ...c.req,
      headers: { ...c.req.header() },
    });
  });
}

export type ProxyPattern = {
  target: string;
  path: string;
};
