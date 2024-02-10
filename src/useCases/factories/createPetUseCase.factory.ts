import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { PrismaPetPhotosRepository } from "@/repositories/prisma/prismaPetPhotos.repository";
import { PrismaPetRequirementsRepository } from "@/repositories/prisma/prismaPetRequirements.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { CreatePetUseCase } from "../createPet.useCase";

export function createPetUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const petRequirementsRepository = new PrismaPetRequirementsRepository();
  const petPhotosRepository = new PrismaPetPhotosRepository();

  return new CreatePetUseCase(
    orgsRepository,
    petsRepository,
    petRequirementsRepository,
    petPhotosRepository,
  );
}
