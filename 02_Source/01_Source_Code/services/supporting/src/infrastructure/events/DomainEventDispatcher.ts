import type { DomainEvent } from "../../domain/core/DomainEvent.js";

type Handler = (event: DomainEvent) => void | Promise<void>;

export class DomainEventDispatcher {
  private handlers: Map<string, Array<Handler>>;

  constructor() {
    this.handlers = new Map(); // eventName => array of callbacks
  }

  register(eventName: string, handler: Handler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  async dispatch(events: DomainEvent[]) {
    for (const event of events) {
      const handlers = this.handlers.get(event.name) || [];
      for (const handler of handlers) {
        await handler(event);
      }
    }
  }
}
