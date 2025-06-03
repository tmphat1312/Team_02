import consola from "consola";
import { Hono } from "hono";

import { SupportingService } from "./application/services/SupportingService.js";
import { ComplaintCreated } from "./domain/supporting/events/ComplaintCreated.js";
import { DomainEventDispatcher } from "./infrastructure/events/DomainEventDispatcher.js";
import { ComplaintRepositoryImpl } from "./infrastructure/persistence/ComplaintRepositoryImpl.js";
import { SupportingController } from "./interfaces/http/controllers/SupportingController.js";
import { createSupportingRoutes } from "./interfaces/http/routes/SupportingRoutes.js";

const server = new Hono();
const eventDispatcher = new DomainEventDispatcher();

// Events
eventDispatcher.register("ComplaintCreated", (event) => {
  const typedEvent = event as ComplaintCreated;
  consola.box("COMPLAINT CREATED", typedEvent.complaint);
});

// Dependency Injection
const complaintRepo = new ComplaintRepositoryImpl();
const complaintService = new SupportingService(complaintRepo, eventDispatcher);
const complaintController = new SupportingController(complaintService);

// Routes
server.route("/supporting", createSupportingRoutes(complaintController));

export { server };
