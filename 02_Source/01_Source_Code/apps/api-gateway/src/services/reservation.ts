import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.RESERVATION_SERVICE_URL ?? "http://localhost:3006",
});

// reservation route
route.get("/reservations*", only(["tenant", "host", "admin"]), proxy);
route.post("/reservations", only(["user"]), proxy);
route.post("/reservations/:reservationId/confirm", only(["host"]), proxy);
route.post("/reservations/:reservationId/cancel", only(["user"]), proxy);
route.post("/reservations/:reservationId/pay", only(["tenant"]), proxy);
route.post("/reservations/:reservationId/refund", only(["host"]), proxy);

// review route
route.get("/reviews*", proxy);
route.post("/reviews", only(["tenant", "host"]), proxy);

// availability route
route.get("/availability*", proxy);

export const reservationService = route;
