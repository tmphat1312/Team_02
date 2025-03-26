import consola from "consola";
import type { Handler } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";

export const corsMiddleware: Handler = async (c, next) => {
  const { ADMIN_APP_URL, WEB_APP_URL } = env<{
    ADMIN_APP_URL: string;
    WEB_APP_URL: string;
  }>(c);
  const corsMiddlewareHandler = cors({
    origin: [ADMIN_APP_URL, WEB_APP_URL],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
    credentials: true,
  });

  consola.info(ADMIN_APP_URL, WEB_APP_URL);

  return corsMiddlewareHandler(c, next);
};
