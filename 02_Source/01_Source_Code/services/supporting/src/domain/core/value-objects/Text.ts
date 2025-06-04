export class Text {
  private readonly value: string;

  constructor(value: string) {
    if (value.length < 1 || value.length > 500) {
      throw new Error("Text must be between 1 and 500 characters long.");
    }
    this.value = value;
  }

  public toString(): string {
    return this.value;
  }
}
