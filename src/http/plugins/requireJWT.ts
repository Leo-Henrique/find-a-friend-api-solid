import { JWTPayload } from "@/@types/fastify-jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function encodeJWT(id: string, res: FastifyReply) {
  const payload: JWTPayload = { id };
  const accessToken = await res.jwtSign(payload, { expiresIn: "5m" });
  const refreshToken = await res.jwtSign(payload, { expiresIn: "7d" });

  res.setCookie("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: true,
  });

  return { accessToken };
}

export async function requireJWT(req: FastifyRequest) {
  await req.jwtVerify();
}
