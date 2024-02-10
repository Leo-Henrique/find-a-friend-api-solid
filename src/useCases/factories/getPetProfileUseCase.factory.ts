import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { GetPetProfileUseCase } from "../getPetProfile.useCase";

export function getPetProfileUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  return new GetPetProfileUseCase(orgsRepository, petsRepository);
}
