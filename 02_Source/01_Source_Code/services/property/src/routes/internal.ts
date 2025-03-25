import { Hono } from "hono";

const route = new Hono();

route.get("/", (c) => {
  return c.text("Hello from Property Service!");
});

route.get("/health", (c) => {
  const timestamp = new Date().toISOString();
  return c.json({ status: "OK", timestamp });
});

route.get("/status", (c) => {
  const timestamp = new Date().toISOString();
  return c.json({ message: "Service is running", timestamp });
});

export const internalRoute = route;
