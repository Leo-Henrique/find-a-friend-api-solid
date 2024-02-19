import { JWTPayload } from "@/@types/fastify-jwt";
import { encodeJWT } from "@/http/plugins/requireJWT";
import { FastifyReply, FastifyRequest } from "fastify";

export async function tokenController(req: FastifyRequest, res: FastifyReply) {
  const { id }: JWTPayload = await req.jwtVerify({ onlyCookie: true });

  const { accessToken } = await encodeJWT(id, res);

  res.status(200).send({ accessToken });
}
