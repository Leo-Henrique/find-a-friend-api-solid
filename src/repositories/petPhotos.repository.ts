import { CreatePetPhoto, PetPhoto } from "@/entities/petPhoto";

export interface PetPhotosRepository {
  create(data: CreatePetPhoto): Promise<PetPhoto>;
}
