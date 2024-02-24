import { FastifyInstance } from "fastify";
import { petRoutes } from "./pet/pet.routes";
import { userRoutes } from "./user/user.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(petRoutes);
}
