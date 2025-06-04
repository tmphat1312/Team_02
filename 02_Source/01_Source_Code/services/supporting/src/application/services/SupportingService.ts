import { Id } from "../../domain/core/value-objects/Id.js";
import { Text } from "../../domain/core/value-objects/Text.js";
import { Complaint } from "../../domain/supporting/entities/Complaint.js";
import { ComplaintCreated } from "../../domain/supporting/events/ComplaintCreated.js";
import { DomainEventDispatcher } from "../../infrastructure/events/DomainEventDispatcher.js";
import type { ComplaintRepository } from "../../domain/supporting/repositories/ComplaintRepository.js";

export class SupportingService {
  constructor(
    private readonly complaintRepository: ComplaintRepository,
    private readonly eventDispatcher: DomainEventDispatcher
  ) {}

  public async getComplaints() {
    const rows = await this.complaintRepository.findMany();
    return rows.map((r) => r.value);
  }

  public async createComplaint(
    userId: Id,
    summary: Text,
    details: Text
  ): Promise<void> {
    const generatedId = new Id(crypto.randomUUID());
    const complaint = new Complaint(generatedId, userId, summary, details);
    complaint.addDomainEvent(new ComplaintCreated(complaint));
    await this.complaintRepository.save(complaint);
    await this.eventDispatcher.dispatch(complaint.pullDomainEvents());
  }
}
