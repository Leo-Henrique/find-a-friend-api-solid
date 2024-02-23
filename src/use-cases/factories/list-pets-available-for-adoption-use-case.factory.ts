import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { ListPetsAvailableForAdoptionUseCase } from "../list-pets-available-for-adoption.use-case";

export function listPetsAvailableForAdoptionUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  return new ListPetsAvailableForAdoptionUseCase(
    orgsRepository,
    petsRepository,
  );
}
