import { DomainEvent } from "../../core/DomainEvent.js";
import { Complaint } from "../entities/Complaint.js";

export class ComplaintCreated extends DomainEvent {
  constructor(public readonly complaint: Complaint) {
    super("ComplaintCreated");
  }
}
