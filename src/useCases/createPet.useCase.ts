import { Pet, PetIndependency, PetSize, PetType } from "@/entities/pet";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { PetPhotosRepository } from "@/repositories/petPhotos.repository";
import { PetRequirementsRepository } from "@/repositories/petRequirements.repository";
import { PetsRepository } from "@/repositories/pets.repository";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error";

interface CreatePetUseCaseRequest {
  orgId: string;
  name: string;
  description: string;
  age: number;
  type: PetType;
  size: PetSize;
  independency: PetIndependency;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  requirements: Array<{ text: string }>;
  photos: Array<{ source: string; alt: string }>;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
    private petRequirementsRepository: PetRequirementsRepository,
    private petPhotosRepository: PetPhotosRepository,
  ) {}

  async execute({
    orgId,
    requirements,
    photos,
    ...rest
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) throw new ResourceNotFoundError("org");

    const pet = await this.petsRepository.create({ orgId, ...rest });

    const createRequirements = requirements.map(requirement => {
      return this.petRequirementsRepository.create({
        petId: pet.id,
        ...requirement,
      });
    });

    const createPhotos = photos.map(photo => {
      return this.petPhotosRepository.create({
        petId: pet.id,
        ...photo,
      });
    });

    await Promise.all([createRequirements, createPhotos]);

    return { pet };
  }
}
