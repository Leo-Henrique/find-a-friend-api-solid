import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { GetPetProfileUseCase } from "../get-pet-profile.use-case";

export function getPetProfileUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  return new GetPetProfileUseCase(orgsRepository, petsRepository);
}
