import { CreatePetPhoto, PetPhoto } from "@/entities/petPhoto";
import { randomUUID } from "crypto";
import { PetPhotosRepository } from "../petPhotos.repository";

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
