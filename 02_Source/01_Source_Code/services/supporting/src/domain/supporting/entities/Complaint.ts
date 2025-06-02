import { EventObject } from "../../../infrastructure/events/EventObject.js";
import { Id } from "../../core/value-objects/Id.js";
import { Text } from "../../core/value-objects/Text.js";

export class Complaint extends EventObject {
  constructor(
    public readonly id: Id,
    public readonly userId: Id,
    public readonly summary: Text,
    public readonly details: Text
  ) {
    super();
  }

  public get value() {
    return {
      id: this.id.toString(),
      summary: this.summary.toString(),
      details: this.details.toString(),
    };
  }

  public toString(): string {
    return `Complaint(id: ${this.id.toString()}, summary: ${this.summary.toString()}, details: ${this.details.toString()})`;
  }
}
