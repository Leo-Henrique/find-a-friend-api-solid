import {
  CreatePetPhoto,
  PetPhoto,
} from "@/application/entities/pet-photo.entity";

export interface PetPhotosRepository {
  create(data: CreatePetPhoto): Promise<PetPhoto>;
}
