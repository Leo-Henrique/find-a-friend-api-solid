import {
  CreatePetRequirement,
  PetRequirement,
} from "@/application/entities/pet-requirement.entity";

export interface PetRequirementsRepository {
  create(data: CreatePetRequirement): Promise<PetRequirement>;
}
