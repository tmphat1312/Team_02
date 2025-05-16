import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.RESERVATION_SERVICE_URL ?? "http://localhost:3006",
});

// reservation route
route.get("/reservations*", only(["tenant", "host", "admin"]), proxy);
route.post("/reservations", only(["tenant", "host"]), proxy);

// review route
route.get("/reviews*", proxy);
route.post("/reviews", only(["tenant", "host"]), proxy);
export const reservationService = route;
