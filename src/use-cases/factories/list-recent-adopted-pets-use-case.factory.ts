import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { ListRecentAdoptedPetsUseCase } from "../list-recent-adopted-pets.use-case";

export function listRecentAdoptedPetsUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();

  return new ListRecentAdoptedPetsUseCase(petsRepository);
}
