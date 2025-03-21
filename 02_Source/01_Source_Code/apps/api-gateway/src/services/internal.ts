import { Hono } from "hono";
import { only } from "../middlewares/only.js";

const route = new Hono();

route.get("/health", only(["admin"]), (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export const internalService = route;
