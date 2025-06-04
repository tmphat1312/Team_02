export class Id {
  constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid ID format");
    }
  }

  private isValid(value: string): boolean {
    return typeof value === "string" && value.length > 0;
  }

  public equals(other: Id) {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
