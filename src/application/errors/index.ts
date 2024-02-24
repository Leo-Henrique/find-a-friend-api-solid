import { UseCaseBaseError } from "./base-error";

export class InvalidCredentialsError extends UseCaseBaseError {
  error = "InvalidCredentialsError";
  HTTPStatusCode = 401;

  constructor() {
    super("Your credentials are invalid.");
  }
}

export class ResourceAlreadyExistsError extends UseCaseBaseError {
  error = "ResourceAlreadyExistsError";
  HTTPStatusCode = 409;

  constructor(resource: string) {
    super(`The specified ${resource.toLowerCase()} already exists.`);
  }
}

export class ResourceNotFoundError extends UseCaseBaseError {
  error = "ResourceNotFoundError";
  HTTPStatusCode = 404;

  constructor(resource: string) {
    super(`Cannot find this ${resource.toLowerCase()}.`);
  }
}

export class UnauthorizedError extends UseCaseBaseError {
  error = "UnauthorizedError";
  HTTPStatusCode = 401;

  constructor() {
    super("Access not authorized.");
  }
}
