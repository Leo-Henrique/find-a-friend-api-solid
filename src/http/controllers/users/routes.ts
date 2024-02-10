import { requireJWT } from "@/http/plugins/requireJWT";
import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { registerController } from "./register.controller";
import { profileController } from "./profile.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: requireJWT }, profileController);
}
