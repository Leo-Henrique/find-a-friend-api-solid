export interface BaseError {
  statusCode: number;
  error: string;
  message: string;
  debug?: object | string;
}

export abstract class UseCaseBaseError extends Error {
  public abstract error: string;
  public abstract HTTPStatusCode: number;

  constructor(public message: string) {
    super(message);
  }
}
