import { Pet } from "@/entities/pet.entity";
import { PetsRepository } from "@/repositories/pets.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";

interface AdoptPetUseCaseRequest {
  orgId: string;
  petId: string;
}

interface AdoptPetUseCaseResponse {
  pet: Pet;
}

export class AdoptPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    petId,
  }: AdoptPetUseCaseRequest): Promise<AdoptPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError("pet");

    if (orgId !== pet.orgId) throw new UnauthorizedError();

    const updatedPet = await this.petsRepository.update(petId, {
      adopted: pet.adopted ? null : new Date(),
    });

    return { pet: updatedPet };
  }
}
