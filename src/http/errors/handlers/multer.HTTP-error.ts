import { FastifyError, FastifyReply } from "fastify";
import { MulterError } from "fastify-multer";
import { HTTPErrorHandler } from "../HTTP-error";

export class CustomMulterError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
  }
}

export async function multerHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);

  if (error instanceof MulterError)
    return HTTPError.send(400, "Upload error.", error.message);

  if (error instanceof CustomMulterError)
    return HTTPError.send(error.statusCode, "Upload error.", error.message);
}
