import { CreatePet, UpdatePet } from "@/application/entities/pet.entity";
import { prisma } from "@/lib/prisma";
import {
  FindManyAvailableForAdoptionParams,
  PetsRepository,
} from "../pets.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePet) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async update(id: string, data: UpdatePet) {
    const pet = await prisma.pet.update({ where: { id }, data });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } });

    return pet;
  }

  async findManyRecentAdopted(limit: number) {
    const pets = await prisma.pet.findMany({
      where: { adopted: { not: null } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return pets;
  }

  async findManyAvailableForAdoption({
    orgIdsInSameCity,
    filters = {},
    items,
    page,
  }: FindManyAvailableForAdoptionParams) {
    const { age, ...restFilters } = filters;
    const pets = await prisma.pet.findMany({
      where: {
        adopted: null,
        orgId: { in: orgIdsInSameCity },
        ...(age && { age: age === "adult" ? { gte: 1 } : { lt: 1 } }),
        ...restFilters,
      },
      orderBy: { createdAt: "desc" },
      skip: items * (page - 1),
      take: items * page,
    });

    return pets;
  }

  async countAvailableForAdoptionByCity(orgIdsInSameCity: string[]) {
    const pets = await prisma.pet.count({
      where: { orgId: { in: orgIdsInSameCity } },
    });

    return pets;
  }
}
