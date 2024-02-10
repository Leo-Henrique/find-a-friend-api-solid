/*
  Types must be created without dependencies! This file is just an example.
*/
import PrismaModels, { Prisma } from "@prisma/client";

export type PetRequirement = PrismaModels.PetRequirement;

export type CreatePetRequirement = Prisma.PetRequirementUncheckedCreateInput;
