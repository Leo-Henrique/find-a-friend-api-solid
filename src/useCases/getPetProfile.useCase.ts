import { Org } from "@/entities/org";
import { Pet } from "@/entities/pet";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { PetsRepository } from "@/repositories/pets.repository";
import { serializeUser } from "@/utils/serializeUser";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error";

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

    if (!pet) throw new ResourceNotFoundError("pet");

    const org = await this.orgsRepository.findById(pet.orgId);

    if (!org) throw new ResourceNotFoundError("pet");

    return { pet, org: serializeUser(org) };
  }
}
