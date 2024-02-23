import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetPhotosRepository } from "../pet-photos.repository";

export class PrismaPetPhotosRepository implements PetPhotosRepository {
  async create(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhoto = await prisma.petPhoto.create({ data });

    return petPhoto;
  }
}
