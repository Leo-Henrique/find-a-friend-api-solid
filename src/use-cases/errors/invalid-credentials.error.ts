import { UseCaseError } from "./use-case.error";

export class InvalidCredentialsError extends Error implements UseCaseError {
  HTTPStatusCode = 401;

  constructor() {
    super("Invalid credentials.");
  }
}
