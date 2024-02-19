import { env } from "@/config";
import { FastifyError, FastifyReply } from "fastify";
import { HTTPErrorHandler } from "../HTTPError";

export async function jwtHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);

  if (error.code.includes("_JWT_")) {
    if (env.NODE_ENV === "development") {
      return HTTPError.send(
        error.statusCode || 401,
        "Unauthorized.",
        error.message,
      );
    }

    return HTTPError.send(401, "Unauthorized.");
  }
}
