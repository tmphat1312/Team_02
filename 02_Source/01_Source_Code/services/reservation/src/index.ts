import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { onError } from "./middleware/on-error";
import reservation from "./routes/reservation";
import route from "./routes/review";

const app = new Hono();

app.use(logger());

app.route("/reservations", reservation);
app.route("/reviews", route);

app.onError(onError);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 3006,
};
