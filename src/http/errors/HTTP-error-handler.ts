import { BaseError, UseCaseBaseError } from "@/application/errors/base-error";
import { UnauthorizedError } from "@/application/errors/use-case-errors";
import { env } from "@/config";
import { FastifyError, FastifyReply } from "fastify";
import { MulterError } from "fastify-multer";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { CustomMulterError, HTTPError } from "./custom-HTTP-errors";

export class HTTPErrorHandler {
  constructor(
    protected error: FastifyError,
    protected response: FastifyReply,
  ) {}

  protected send({ statusCode, error, message, debug }: BaseError) {
    const parsedDebug = () => {
      if (!debug || env.NODE_ENV !== "development") return {};

      return { debug };
    };

    this.response
      .status(statusCode)
      .send({ statusCode, error, message, ...parsedDebug() });

    return true;
  }

  async customHTTPErrorHandler() {
    if (this.error instanceof HTTPError) return this.send(this.error);
  }

  async unknownErrorHandler() {
    if (this.error.statusCode) {
      return this.send({
        statusCode: this.error.statusCode,
        error: this.error.name,
        message: this.error.message,
      });
    }

    return this.send({
      statusCode: 500,
      error: "InternalServerError",
      message: "Sorry, an unexpected error occurred.",
      debug: this.error.message,
    });
  }

  async JWTErrorHandler() {
    if (this.error.code && this.error.code.includes("_JWT_")) {
      const { HTTPStatusCode, error, message } = new UnauthorizedError();

      return this.send({
        statusCode: this.error.statusCode || HTTPStatusCode,
        error,
        message,
        debug: this.error.message,
      });
    }
  }

  async multerErrorHandler() {
    if (
      this.error instanceof MulterError ||
      this.error instanceof CustomMulterError
    ) {
      return this.send({
        statusCode: (this.error as CustomMulterError).statusCode || 400,
        error: "UploadError",
        message: this.error.message,
      });
    }
  }

  async zodErrorHandler() {
    if (this.error instanceof ZodError) {
      const { message } = fromZodError(this.error, {
        maxIssuesInMessage: 1,
        prefix: null,
      });

      return this.send({
        statusCode: 400,
        error: "ValidationError",
        message,
        debug: this.error.format(),
      });
    }
  }

  async useCaseErrorHandler() {
    if (this.error instanceof UseCaseBaseError) {
      const { HTTPStatusCode, error, message } = this.error;

      return this.send({ statusCode: HTTPStatusCode, error, message });
    }
  }
}
