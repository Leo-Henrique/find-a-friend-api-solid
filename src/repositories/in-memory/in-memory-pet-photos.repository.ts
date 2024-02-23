import { CreatePetPhoto, PetPhoto } from "@/entities/pet-photo.entity";
import { randomUUID } from "crypto";
import { PetPhotosRepository } from "../pet-photos.repository";

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public data: PetPhoto[] = [];

  async create(data: CreatePetPhoto) {
    const petPhoto: PetPhoto = {
      id: randomUUID(),
      ...data,
    };

    this.data.push(petPhoto);

    return petPhoto;
  }
}
