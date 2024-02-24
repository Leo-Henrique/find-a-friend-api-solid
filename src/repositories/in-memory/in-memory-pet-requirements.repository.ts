import {
  CreatePetRequirement,
  PetRequirement,
} from "@/application/entities/pet-requirement.entity";
import { randomUUID } from "crypto";
import { PetRequirementsRepository } from "../pet-requirements.repository";

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
