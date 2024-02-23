import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { AdoptPetUseCase } from "../adopt-pet.use-case";

export function adoptPetUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();

  return new AdoptPetUseCase(petsRepository);
}
