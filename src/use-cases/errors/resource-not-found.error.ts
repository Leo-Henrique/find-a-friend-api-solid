import { UseCaseError } from "./use-case.error";

export class ResourceNotFoundError extends Error implements UseCaseError {
  HTTPStatusCode = 404;

  constructor(resource: string) {
    const firstLetter = resource[0].toUpperCase();
    const text = firstLetter + resource.slice(1).toLowerCase();

    super(`${text} not found.`);
  }
}
