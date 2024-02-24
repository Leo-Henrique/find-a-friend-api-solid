import { UseCaseError } from "./use-case.error";

export class UnauthorizedError extends Error implements UseCaseError {
  HTTPStatusCode = 401;

  constructor() {
    super("Unauthorized.");
  }
}
