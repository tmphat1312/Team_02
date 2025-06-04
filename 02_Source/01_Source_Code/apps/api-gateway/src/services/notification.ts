import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL ?? "http://localhost:3007",
});

route.get("/notifications*", only(["user", "admin"]), proxy);
route.post("/notifications", only(["user", "admin"]), proxy);
route.post("/notifications/:id/read", only(["user", "admin"]), proxy);

export const notificationService = route;
