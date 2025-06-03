import "dotenv/config";

import { serve } from "@hono/node-server";
import { consola } from "consola";
import { showRoutes } from "hono/dev";
import { env } from "std-env";
import { server } from "./server.js";

const port = Number(env.PORT) || 3000;
showRoutes(server);
serve(
  { fetch: server.fetch, port },
  (info) => void consola.info(`Server is running on :${info.port}`)
);
