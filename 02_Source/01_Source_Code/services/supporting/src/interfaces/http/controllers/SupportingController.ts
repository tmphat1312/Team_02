import type { Context } from "hono";
import type { SupportingService } from "../../../application/services/SupportingService.js";
import { Id } from "../../../domain/core/value-objects/Id.js";
import { Text } from "../../../domain/core/value-objects/Text.js";

export class SupportingController {
  constructor(private readonly supportingService: SupportingService) {}

  public async index(context: Context) {
    const complaints = await this.supportingService.getComplaints();
    return context.json(complaints, 200);
  }

  public async create(context: Context) {
    const { userId, summary, details } = await context.req.json();
    await this.supportingService.createComplaint(
      new Id(userId),
      new Text(summary),
      new Text(details)
    );
    return context.json(null, 201);
  }
}
