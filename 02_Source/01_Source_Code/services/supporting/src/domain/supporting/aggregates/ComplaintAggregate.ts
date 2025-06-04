import type { User } from "../../user/entities/User.js";
import type { Complaint } from "../entities/Complaint.js";

export class ComplaintAggregate {
  constructor(
    public readonly complaint: Complaint,
    public readonly user: User
  ) {}

  public get value() {
    return {
      ...this.complaint,
      user: this.user,
    };
  }
}
