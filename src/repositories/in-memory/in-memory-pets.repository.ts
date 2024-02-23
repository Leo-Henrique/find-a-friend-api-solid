import { CreatePet, Pet, UpdatePet } from "@/entities/pet.entity";
import { randomUUID } from "crypto";
import {
  FindManyAvailableForAdoptionParams,
  PetsRepository,
} from "../pets.repository";

export class InMemoryPetsRepository implements PetsRepository {
  public data: Pet[] = [];

  async create(data: CreatePet) {
    const pet: Pet = {
      ...data,
      id: data.id ?? randomUUID(),
      adopted: data.adopted ? new Date(data.adopted) : null,
      createdAt: new Date(),
    };

    this.data.push(pet);

    return pet;
  }

  async update(id: string, data: UpdatePet) {
    const petIndex = this.data.findIndex(pet => pet.id === id);

    if (petIndex > -1)
      this.data[petIndex] = { ...this.data[petIndex], ...(data as Pet) };

    return this.data[petIndex];
  }

  async findById(id: string) {
    const pet = this.data.find(pet => pet.id === id);

    if (!pet) return null;

    return pet;
  }

  async findManyRecentAdopted(limit: number) {
    const adoptedPets = this.data.filter(item => item.adopted);
    const recentAdoptedPets = adoptedPets.sort((a, b) => {
      return b.adopted!.getTime() - a.adopted!.getTime();
    });

    return recentAdoptedPets.slice(0, limit);
  }

  async findManyAvailableForAdoption({
    orgIdsInSameCity,
    filters,
    items,
    page,
  }: FindManyAvailableForAdoptionParams) {
    let pets = this.data
      .filter(pet => {
        return !pet.adopted && orgIdsInSameCity.includes(pet.orgId);
      })
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

    if (filters) {
      pets = pets.filter(pet => {
        const keys = Object.keys(filters);

        return keys.some(key => {
          if (key === "age") {
            const age = filters.age;

            return age === "adult" ? pet.age >= 1 : pet.age < 1;
          }

          return pet[key as keyof Pet] === filters[key as keyof typeof filters];
        });
      });
    }

    return pets.slice(items * (page - 1), items * page);
  }

  async countAvailableForAdoptionByCity(orgIdsInSameCity: string[]) {
    const pets = this.data.filter(pet => {
      return !pet.adopted && orgIdsInSameCity.includes(pet.orgId);
    });

    return pets.length;
  }
}
