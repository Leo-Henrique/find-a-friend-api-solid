import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { PrismaPetPhotosRepository } from "@/repositories/prisma/prisma-pet-photos.repository";
import { PrismaPetRequirementsRepository } from "@/repositories/prisma/prisma-pet-requirements.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { CreatePetUseCase } from "../create-pet.use-case";

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
