import { Hono } from "hono";
import type { SupportingController } from "../controllers/SupportingController.js";

export function createSupportingRoutes(
  supportingController: SupportingController
) {
  const router = new Hono();
  router.get("/complaints", (c) => supportingController.index(c));
  router.post("/complaints", (c) => supportingController.create(c));
  return router;
}
