import { CreatePetPhoto, PetPhoto } from "@/entities/pet-photo.entity";

export interface PetPhotosRepository {
  create(data: CreatePetPhoto): Promise<PetPhoto>;
}
