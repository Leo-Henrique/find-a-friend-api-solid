import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { randomUUID } from "crypto";
import { orgPasswordHashTest, orgTest, petUseCaseTest } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { ListPetsAvailableForAdoptionUseCase } from "./list-pets-available-for-adoption.use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: ListPetsAvailableForAdoptionUseCase;

const city = "Fake city";
let orgId: string;

describe("List pets available for adoption Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new ListPetsAvailableForAdoptionUseCase(
      orgsRepository,
      petsRepository,
    );

    const org = await orgsRepository.create({
      ...orgTest,
      passwordHash: orgPasswordHashTest,
      city,
    });

    orgId = org.id;
  });

  it("should be able to list pets available for adoption", async () => {
    for (let i = 1; i <= 2; i++)
      await petsRepository.create({
        ...petUseCaseTest,
        orgId,
        adopted: new Date(),
      });

    const petsAvailableForAdoptionCount = 3;

    for (let i = 1; i <= petsAvailableForAdoptionCount; i++)
      await petsRepository.create({ ...petUseCaseTest, orgId });

    const { pets, totalInCity } = await sut.execute({
      city,
      items: 10,
      page: 1,
    });

    expect(pets).toHaveLength(petsAvailableForAdoptionCount);
    expect(totalInCity).toEqual(petsAvailableForAdoptionCount);
  });

  it("should not be able to list pets available for adoption in different cities", async () => {
    for (let i = 1; i <= 2; i++)
      await petsRepository.create({ ...petUseCaseTest, orgId: randomUUID() });

    const petsInSameCity = 3;

    for (let i = 1; i <= petsInSameCity; i++)
      await petsRepository.create({ ...petUseCaseTest, orgId });

    const { pets } = await sut.execute({ city, items: 10, page: 1 });

    expect(pets).toHaveLength(petsInSameCity);
    expect(pets).toEqual(
      pets.map(() => {
        return expect.objectContaining({ orgId });
      }),
    );
  });

  it("should be able to list pets available for adoption with filters", async () => {
    const filters = [
      { age: "cub" },
      { energyLevel: 1 },
      { size: "small" },
      { independency: "little" },
    ] as const;

    for (const filter of filters) {
      const isAge = "age" in filter;
      const age = { age: 0 };

      await petsRepository.create({
        ...petUseCaseTest,
        orgId,
        ...(isAge ? age : filter),
      });

      const { pets } = await sut.execute({
        city,
        filters: filter,
        items: 10,
        page: 1,
      });

      expect(pets).toHaveLength(1);
      expect(pets[0]).toEqual(expect.objectContaining(isAge ? age : filter));
    }
  });

  it("should be able pets available for adoption with pagination", async () => {
    const items = 10;
    const itemsInLastPage = 2;

    for (let i = 1; i <= items + itemsInLastPage; i++)
      await petsRepository.create({ ...petUseCaseTest, orgId });

    const { pets, totalInCity } = await sut.execute({ city, items, page: 2 });

    expect(pets).toHaveLength(itemsInLastPage);
    expect(totalInCity).toEqual(items + itemsInLastPage);
  });
});
