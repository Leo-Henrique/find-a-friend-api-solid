import { UseCaseError } from "./use-case.error";

export class OrgAlreadyExistsError extends Error implements UseCaseError {
  HTTPStatusCode = 409;

  constructor() {
    super("Org already exists.");
  }
}
