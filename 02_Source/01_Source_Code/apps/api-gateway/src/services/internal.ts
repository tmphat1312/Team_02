import { Hono } from "hono";
import { only } from "../middlewares/only.js";

const route = new Hono();

route.get("/status", only(["admin"]), (c) => {
  return c.text(`Server is running on ${new Date().toISOString()}`);
});

route.get("/ping", (c) => c.text("pong"));

export const internalService = route;
