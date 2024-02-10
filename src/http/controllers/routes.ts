import { FastifyInstance } from "fastify";
import { petRoutes } from "./pets/routes";
import { userRoutes } from "./users/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(petRoutes);
}
