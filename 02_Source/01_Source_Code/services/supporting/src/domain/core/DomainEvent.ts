export class DomainEvent {
  constructor(
    public readonly name: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
