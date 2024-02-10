import { FastifyError, FastifyReply } from "fastify";
import { HTTPError as GenericHTTPError, HTTPErrorHandler } from "../HTTPError";

export async function customHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);

  if (error instanceof GenericHTTPError) {
    const { statusCode, message, detail } = error;

    return HTTPError.send(statusCode, message, detail);
  }
}
