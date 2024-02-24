import { Pet } from "@/application/entities/pet.entity";
import { PetsRepository } from "@/repositories/pets.repository";

interface ListRecentAdoptedPetsUseCaseRequest {
  limit: number;
}

interface ListRecentAdoptedPetsUseCaseResponse {
  pets: Pet[];
}

export class ListRecentAdoptedPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    limit,
  }: ListRecentAdoptedPetsUseCaseRequest): Promise<ListRecentAdoptedPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyRecentAdopted(limit);

    return { pets };
  }
}
