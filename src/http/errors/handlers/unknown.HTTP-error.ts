import { env } from "@/config";
import { FastifyError, FastifyReply } from "fastify";
import { HTTPErrorHandler } from "../HTTP-error";

export async function unknownHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);

  if (env.NODE_ENV === "development") {
    return HTTPError.send(
      error.statusCode || 500,
      error.statusCode ? error.name : "Internal server error.",
      error.message,
    );
  }

  return HTTPError.send(500, "Internal server error.");
}
