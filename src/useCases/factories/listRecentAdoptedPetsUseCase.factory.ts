import { PrismaPetsRepository } from "@/repositories/prisma/prismaPets.repository";
import { ListRecentAdoptedPetsUseCase } from "../listRecentAdoptedPets.useCase";

export function listRecentAdoptedPetsUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();

  return new ListRecentAdoptedPetsUseCase(petsRepository);
}
