import { Hono } from "hono";

const route = new Hono();

route.get("/", (c) => c.text("Hello from Payment Service!"));

route.get("/status", (c) =>
  c.text(`Service is running on ${new Date().toISOString()}`)
);

export const internalRoute = route;
