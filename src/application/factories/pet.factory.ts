import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { PrismaPetPhotosRepository } from "@/repositories/prisma/prisma-pet-photos.repository";
import { PrismaPetRequirementsRepository } from "@/repositories/prisma/prisma-pet-requirements.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { AdoptPetUseCase } from "../use-cases/pet/adopt-pet.use-case";
import { CreatePetUseCase } from "../use-cases/pet/create-pet.use-case";
import { GetPetProfileUseCase } from "../use-cases/pet/get-pet-profile.use-case";
import { ListPetsAvailableForAdoptionUseCase } from "../use-cases/pet/list-pets-available-for-adoption.use-case";
import { ListRecentAdoptedPetsUseCase } from "../use-cases/pet/list-recent-adopted-pets.use-case";

const orgsRepository = new PrismaOrgsRepository();
const petsRepository = new PrismaPetsRepository();

export function makeCreatePetUseCase() {
  const petRequirementsRepository = new PrismaPetRequirementsRepository();
  const petPhotosRepository = new PrismaPetPhotosRepository();

  return new CreatePetUseCase(
    orgsRepository,
    petsRepository,
    petRequirementsRepository,
    petPhotosRepository,
  );
}

export function makeAdoptPetUseCase() {
  return new AdoptPetUseCase(petsRepository);
}

export function makeGetPetProfileUseCase() {
  return new GetPetProfileUseCase(orgsRepository, petsRepository);
}

export function makeListPetsAvailableForAdoptionUseCase() {
  return new ListPetsAvailableForAdoptionUseCase(
    orgsRepository,
    petsRepository,
  );
}

export function makeListRecentAdoptedPetsUseCase() {
  return new ListRecentAdoptedPetsUseCase(petsRepository);
}
