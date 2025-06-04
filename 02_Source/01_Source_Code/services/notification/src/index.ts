//#region imports
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { showRoutes } from "hono/dev";

import { env } from "./env";
import { onError } from "./middlewares/on-error";
import { notificationRoute } from "./routes/notification";
//#endregion

const app = new Hono();

app.use(logger());

app.route("/notifications", notificationRoute);

app.onError(onError);

showRoutes(app);

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on port ${info.port}`);
  }
);

//#region graceful shutdown
process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.close();
});
//#endregion
