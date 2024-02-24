import { BaseError } from "@/application/errors/base-error";

export class HTTPError extends Error implements BaseError {
  constructor(
    public statusCode: number,
    public error: string,
    public message: string,
    public debug?: string | object,
  ) {
    super(message);
  }
}

export class CustomMulterError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
  }
}
