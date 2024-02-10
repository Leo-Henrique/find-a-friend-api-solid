import {
  CreatePetRequirement,
  PetRequirement,
} from "@/entities/petRequirement";

export interface PetRequirementsRepository {
  create(data: CreatePetRequirement): Promise<PetRequirement>;
}
