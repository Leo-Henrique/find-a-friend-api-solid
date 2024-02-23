import { FastifyError, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { HTTPErrorHandler } from "../HTTP-error";

export async function zodHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);

  if (error instanceof ZodError)
    return HTTPError.send(400, "Validation error.", { issues: error.format() });
}
