/*
  Types must be created without dependencies! This file is just an example.
*/
import PrismaModels, { Prisma } from "@prisma/client";

export type Pet = PrismaModels.Pet;

export type PetType = PrismaModels.$Enums.PetType;

export type PetSize = PrismaModels.$Enums.PetSize;

export type PetIndependency = PrismaModels.$Enums.PetIndependency;

export type CreatePet = Prisma.PetUncheckedCreateInput;

export type UpdatePet = Prisma.PetUncheckedUpdateInput;
