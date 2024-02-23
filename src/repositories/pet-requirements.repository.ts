import {
  CreatePetRequirement,
  PetRequirement,
} from "@/entities/pet-requirement.entity";

export interface PetRequirementsRepository {
  create(data: CreatePetRequirement): Promise<PetRequirement>;
}
