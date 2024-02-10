import { UseCaseError } from "./useCase.error";

export class InvalidCredentialsError extends Error implements UseCaseError {
  HTTPStatusCode = 401;

  constructor() {
    super("Invalid credentials.");
  }
}
