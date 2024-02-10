import { requireJWT } from "@/http/plugins/requireJWT";
import { requireUpload } from "@/http/plugins/requireUpload";
import { FastifyInstance } from "fastify";
import { adoptPetController } from "./adoptPet.controller";
import { createPetController } from "./createPet.controller";
import { getPetProfileController } from "./getPetProfile.controller";
import { listPetsAvailableForAdoptionController } from "./listPetsAvailableForAdoption.controller";
import { listRecentAdoptedPetsController } from "./listRecentAdoptedPets.controller";

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
