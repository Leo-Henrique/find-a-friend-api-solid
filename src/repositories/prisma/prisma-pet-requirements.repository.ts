import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetRequirementsRepository } from "../pet-requirements.repository";

export class PrismaPetRequirementsRepository
  implements PetRequirementsRepository
{
  async create(data: Prisma.PetRequirementUncheckedCreateInput) {
    const petRequirement = await prisma.petRequirement.create({ data });

    return petRequirement;
  }
}
