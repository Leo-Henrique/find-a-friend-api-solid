import { UseCaseError } from "./useCase.error";

export class UnauthorizedError extends Error implements UseCaseError {
  HTTPStatusCode = 401;

  constructor() {
    super("Unauthorized.");
  }
}
