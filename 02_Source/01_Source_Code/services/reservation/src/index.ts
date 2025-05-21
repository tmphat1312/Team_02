import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { onError } from "./middleware/on-error";
import { reservationRoute } from "./routes/reservation";
import { reviewRoute } from "./routes/review";
import { availabilityRoute } from "./routes/availability";
import { env } from "./env";

const app = new Hono();

app.use(logger());

app.route("/reservations", reservationRoute);
app.route("/reviews", reviewRoute);
app.route("/availability", availabilityRoute);

app.onError(onError);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: env.PORT ?? 3000,
};
