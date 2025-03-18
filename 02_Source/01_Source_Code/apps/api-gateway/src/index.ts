import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";

import consola from "consola";

import { auth } from "./lib/auth.js";
import { only } from "./middlewares/only.js";

const app = new Hono();

app.use("*", async (c, next) => {
  const { ADMIN_APP_URL, WEB_APP_URL } = env<{
    ADMIN_APP_URL: string;
    WEB_APP_URL: string;
  }>(c);
  const corsMiddlewareHandler = cors({
    origin: [ADMIN_APP_URL, WEB_APP_URL],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  });
  return corsMiddlewareHandler(c, next);
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/health", only(["admin"]), (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    consola.info(`Server is running on port ${info.port}`);
  }
);
