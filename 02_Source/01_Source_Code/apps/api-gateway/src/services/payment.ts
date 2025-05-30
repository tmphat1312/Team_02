import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL ?? "http://localhost:3008",
});

route.get("/payment-url", only(["user"]), proxy);
route.get("/vnpay-return", only(["user"]), proxy);
route.get("/user-wallets*", only(["user"]), proxy);
route.get("/user-deposit-history*", only(["user"]), proxy);
route.get("/user-payment-history*", only(["user"]), proxy);
route.post("/user-payment-history/*", only(["user"]), proxy);

export { route as paymentService };
