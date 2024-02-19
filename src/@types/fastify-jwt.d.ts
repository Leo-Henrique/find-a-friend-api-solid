import "@fastify/jwt";

export interface JWTPayload {
  id: string;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTPayload;
  }
}
