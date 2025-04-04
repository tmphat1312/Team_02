import { app } from "@getcronit/pylon";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { consola } from "consola";

import { onError } from "./middlewares/on-error";

import { amenitiesRoute } from "./routes/amenities";
import { categoriesRoute } from "./routes/categories";
import { Mutation, Query } from "./routes/graphql";
import { internalRoute } from "./routes/internal";
import { rulesRoute } from "./routes/rules";

app.use(logger(consola.info));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.route("/", internalRoute);
app.route("/categories", categoriesRoute);
app.route("/amenities", amenitiesRoute);
app.route("/rules", rulesRoute);

app.onError(onError);

showRoutes(app);

export const graphql = { Query, Mutation };
export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 3000,
};
