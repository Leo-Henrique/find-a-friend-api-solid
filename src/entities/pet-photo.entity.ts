/*
  Types must be created without dependencies! This file is just an example.
*/
import PrismaModels, { Prisma } from "@prisma/client";

export type PetPhoto = PrismaModels.PetPhoto;

export type CreatePetPhoto = Prisma.PetPhotoUncheckedCreateInput;
