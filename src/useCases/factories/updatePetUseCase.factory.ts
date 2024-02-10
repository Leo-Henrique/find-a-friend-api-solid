import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { UpdatePetUseCase } from "../updatePet.useCase";

export function updatePetUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();

  return new UpdatePetUseCase(petsRepository)
}