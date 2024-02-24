import { Pet } from "@/application/entities/pet.entity";
import {
  ResourceNotFoundError,
  UnauthorizedError,
} from "@/application/errors/use-case-errors";
import { PetsRepository } from "@/repositories/pets.repository";

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

    if (!pet) throw new ResourceNotFoundError("Pet");

    if (orgId !== pet.orgId) throw new UnauthorizedError();

    const updatedPet = await this.petsRepository.update(petId, {
      adopted: pet.adopted ? null : new Date(),
    });

    return { pet: updatedPet };
  }
}
