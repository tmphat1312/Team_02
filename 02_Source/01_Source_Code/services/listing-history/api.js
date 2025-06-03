import { createEndpoint, createRouter } from "better-call";
import { toNodeHandler } from "better-call/node";
import { createServer } from "http";
import { env } from "std-env";
import { z } from "zod";

import * as command from "./command/command.js";
import * as query from "./query/query.js";

//#region Endpoints
const getListings = createEndpoint(
  "/listings",
  { method: "GET" },
  async (ctx) => {
    const listings = await query.getListings();
    return listings;
  }
);

const createListing = createEndpoint(
  "/listings",
  {
    method: "POST",
    body: z.object({
      title: z.string(),
      pricePerNight: z.number(),
    }),
  },
  async (ctx) => {
    const { title, pricePerNight } = ctx.body;
    await command.createListing({ title, pricePerNight });
    return ctx.json(null, 201);
  }
);

const updateListing = createEndpoint(
  "/listings/:id",
  {
    method: "PUT",
    body: z.object({
      title: z.string().optional(),
      pricePerNight: z.number().optional(),
    }),
  },
  async (ctx) => {
    const { id } = ctx.params;
    const { title, pricePerNight } = ctx.body;
    await command.updateListing({ id, title, pricePerNight });
    return ctx.json(null, 204);
  }
);

const deleteListing = createEndpoint(
  "/listings/:id",
  { method: "DELETE" },
  async (ctx) => {
    const { id } = ctx.params;
    await command.deleteListing({ id });
    return ctx.json(null, 204);
  }
);
//#endregion

//#region Router
const router = createRouter({
  getListings,
  createListing,
  updateListing,
  deleteListing,
});
//#endregion

const port = env.PORT || 3000;
const api = createServer(toNodeHandler(router.handler));

api.listen(port, () => void console.log(`API is running on :${port}\n`));
