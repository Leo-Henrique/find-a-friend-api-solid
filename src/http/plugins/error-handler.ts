import { env } from "@/config";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { HTTPErrorHandler } from "../errors/HTTP-error-handler";

export async function errorHandler(
  error: FastifyError,
  _req: FastifyRequest,
  response: FastifyReply,
) {
  if (env.NODE_ENV === "development") console.error(error);

  const methodNames = Object.getOwnPropertyNames(HTTPErrorHandler.prototype);
  const unknownErrorName = "unknownErrorHandler";
  const handlerNames = methodNames.filter(name => {
    return name.endsWith("ErrorHandler") && !name.includes(unknownErrorName);
  });

  handlerNames.push(unknownErrorName);

  const handlerInstance = new HTTPErrorHandler(error, response);

  for (const handlerName of handlerNames) {
    const hasError =
      await handlerInstance[handlerName as keyof HTTPErrorHandler]();

    if (hasError) break;
  }
}
