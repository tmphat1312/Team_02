import type { DomainEvent } from "../../domain/core/DomainEvent.js";

export class EventObject {
  private domainEvents: DomainEvent[] = [];

  public addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}
