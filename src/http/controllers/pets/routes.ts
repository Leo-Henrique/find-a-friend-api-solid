import { requireJWT } from "@/http/plugins/require-JWT";
import { requireUpload } from "@/http/plugins/require-upload";
import { FastifyInstance } from "fastify";
import { adoptPetController } from "./adopt-pet.controller";
import { createPetController } from "./create-pet.controller";
import { getPetProfileController } from "./get-pet-profile.controller";
import { listPetsAvailableForAdoptionController } from "./list-pets-available-for-adoption.controller";
import { listRecentAdoptedPetsController } from "./list-recent-adopted-pets.controller";

export async function petRoutes(app: FastifyInstance) {
  const [requireMultipart, ...petPhotoUpload] = requireUpload({
    fieldName: "photos",
    allowedExtensions: ["jpeg", "png"],
    limits: { files: 10, fileSize: 1000000 * 5 },
  });

  app.post(
    "/pets",
    {
      onRequest: [requireJWT, requireMultipart],
      preHandler: petPhotoUpload,
    },
    createPetController,
  );

  app.patch(
    "/pets/:petId/adoptions",
    { onRequest: requireJWT },
    adoptPetController,
  );

  app.get("/pets/available", listPetsAvailableForAdoptionController);

  app.get("/pets/adoptions", listRecentAdoptedPetsController);

  app.get("/pets/:petId", getPetProfileController);
}
