import { UseCaseError } from "@/application/errors/use-case.error";
import { FastifyError, FastifyReply } from "fastify";
import { readdir } from "fs/promises";
import { join } from "path";
import { HTTPErrorHandler } from "../HTTP-error";

export async function useCaseHTTPError(
  error: FastifyError,
  response: FastifyReply,
) {
  const HTTPError = new HTTPErrorHandler(response);
  const useCaseErrorsFileNames = await readdir(
    join(__dirname, "../../../useCases/errors"),
  );

  for (const fileName of useCaseErrorsFileNames) {
    const fileImport = await import(`@/useCases/errors/${fileName}`);
    const [firstImportName] = Object.keys(fileImport);
    const UseCaseError: new () => UseCaseError = fileImport[firstImportName];

    if (firstImportName && error instanceof UseCaseError)
      return HTTPError.send(error.HTTPStatusCode, error.message);
  }
}
