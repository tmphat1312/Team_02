import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./lib/auth.js";
import { env } from "../env.js";

const app = new Hono();

app.get("/health", (c) => {
  return c.text("Ok!");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

serve(
  {
    fetch: app.fetch,
    port: env.get("PORT", 3000),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
