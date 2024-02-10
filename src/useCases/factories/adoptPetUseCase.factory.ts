import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { AdoptPetUseCase } from "../adoptPet.useCase";

export function adoptPetUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();

  return new AdoptPetUseCase(petsRepository);
}
