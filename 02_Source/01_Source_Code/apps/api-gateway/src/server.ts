import { serve } from "@hono/node-server";
import { consola } from "consola";

import app from "./app.js";

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    consola.info(`Server is running on port ${info.port}`);
  }
);
