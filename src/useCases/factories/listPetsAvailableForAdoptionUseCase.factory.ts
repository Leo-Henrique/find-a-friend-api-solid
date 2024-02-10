import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { ListPetsAvailableForAdoptionUseCase } from "../listPetsAvailableForAdoption.useCase";

export function listPetsAvailableForAdoptionUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  return new ListPetsAvailableForAdoptionUseCase(
    orgsRepository,
    petsRepository,
  );
}
