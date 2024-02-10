import {
  CreatePetRequirement,
  PetRequirement,
} from "@/entities/petRequirement";
import { randomUUID } from "crypto";
import { PetRequirementsRepository } from "../petRequirements.repository";

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public data: PetRequirement[] = [];

  async create(data: CreatePetRequirement) {
    const petRequirement: PetRequirement = {
      id: randomUUID(),
      ...data,
    };

    this.data.push(petRequirement);

    return petRequirement;
  }
}
