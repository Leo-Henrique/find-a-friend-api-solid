import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { readdir } from "fs/promises";
import { join } from "path";
import { unknownHTTPError } from "../errors/handlers/unknown.HTTPError";

export async function errorHandler(
  error: FastifyError,
  _req: FastifyRequest,
  response: FastifyReply,
) {
  const errorHandlersFileNames = (
    await readdir(join(__dirname, "../errors/handlers"))
  ).filter(name => !name.includes("unknown.HTTPError"));

  for (let i = 0; i < errorHandlersFileNames.length; i++) {
    const fileName = errorHandlersFileNames[i];
    const fileImports = await import(`@/http/errors/handlers/${fileName}`);
    const handlerFunctionName = Object.keys(fileImports).find(importName => {
      return importName.endsWith("HTTPError");
    });
    const handler = fileImports[handlerFunctionName!];
    const hasCustomError = await handler(error, response);

    if (hasCustomError) break;

    if (i === errorHandlersFileNames.length - 1)
      await unknownHTTPError(error, response);
  }
}
