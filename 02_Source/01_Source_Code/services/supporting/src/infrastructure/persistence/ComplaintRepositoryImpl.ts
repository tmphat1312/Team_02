import type { Complaint } from "../../domain/supporting/entities/Complaint.js";
import type { ComplaintRepository } from "../../domain/supporting/repositories/ComplaintRepository.js";

export class ComplaintRepositoryImpl implements ComplaintRepository {
  private complaints: Complaint[] = [];

  public async save(complaint: Complaint): Promise<void> {
    this.complaints.push(complaint);
  }

  public async findMany(): Promise<Complaint[]> {
    return this.complaints;
  }
}
