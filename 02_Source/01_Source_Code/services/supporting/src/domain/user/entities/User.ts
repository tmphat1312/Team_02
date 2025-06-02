import { Id } from "../../core/value-objects/Id.js";
import { Username } from "../value-objects/Username.js";

export class User {
  constructor(public readonly id: Id, public readonly name: Username) {}
}
