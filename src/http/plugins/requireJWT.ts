import { FastifyRequest } from "fastify";
import { HTTPError } from "../errors/HTTPError";

export async function requireJWT(req: FastifyRequest) {
  try {
    await req.jwtVerify();
  } catch {
    throw new HTTPError(401, "Unauthorized.");
  }
}
