import { CreatePet, Pet, UpdatePet } from "@/entities/pet.entity";

export interface FindManyAvailableForAdoptionParams {
  orgIdsInSameCity: string[];
  filters?: {
    age?: "adult" | "cub";
    energyLevel?: Pet["energyLevel"];
    size?: Pet["size"];
    independency?: Pet["independency"];
  };
  items: number;
  page: number;
}

export interface PetsRepository {
  create(data: CreatePet): Promise<Pet>;
  update(id: string, data: UpdatePet): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyRecentAdopted(limit: number): Promise<Pet[]>;
  findManyAvailableForAdoption(
    params: FindManyAvailableForAdoptionParams,
  ): Promise<Pet[]>;
  countAvailableForAdoptionByCity(orgIdsInSameCity: string[]): Promise<number>;
}
