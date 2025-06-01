import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { consola } from "consola";

import { onError } from "./middlewares/error/on-error";

import { internalRoute } from "./routes/internal";
import { paymentsRoute } from "./routes/payments"
import {walletsRoute} from "./routes/wallets"

const app = new Hono();

app.use(logger(consola.info));

app.route("/", internalRoute);
app.route("/payment", paymentsRoute);
app.route("/wallet", walletsRoute);

app.onError(onError);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 3000,
};
