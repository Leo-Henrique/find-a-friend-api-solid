import { serializeUser } from "@/application/adapters/serialize-user";
import { Org } from "@/application/entities/org.entity";
import { Pet } from "@/application/entities/pet.entity";
import { ResourceNotFoundError } from "@/application/errors/use-case-errors";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { PetsRepository } from "@/repositories/pets.repository";

interface GetPetProfileUseCaseRequest {
  petId: string;
}

interface GetPetProfileUseCaseResponse {
  pet: Pet;
  org: Omit<Org, "passwordHash">;
}

export class GetPetProfileUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError("Pet");

    const org = await this.orgsRepository.findById(pet.orgId);

    if (!org) throw new ResourceNotFoundError("Pet");

    return { pet, org: serializeUser(org) };
  }
}
