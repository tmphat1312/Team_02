import { Complaint } from "../entities/Complaint.js";

export interface ComplaintRepository {
  save(complaint: Complaint): Promise<void>;
  findMany(): Promise<Complaint[]>;
}
