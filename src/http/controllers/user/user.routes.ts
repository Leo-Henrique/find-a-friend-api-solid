import { requireJWT } from "@/http/plugins/require-JWT";
import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { tokenController } from "./token.controller";
import { profileController } from "./profile.controller";
import { registerController } from "./register.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.patch("/sessions/token", tokenController);

  app.get("/me", { onRequest: requireJWT }, profileController);
}
